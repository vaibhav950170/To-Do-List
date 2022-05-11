import uuid
import datetime
from app.main import db
from app.main.model.user import User
from app.main.model.task import Task
import datetime
import smtplib
def save_new_task(data):
	time=str(datetime.datetime.today().time()).split(':')
	dueDate=datetime.datetime.strptime(data['duedate'],'%d-%m-%Y')
	dueDate = dueDate.replace(hour=int(time[0]),minute=int(time[1]))
	new_task = Task(
    	taskid = str(uuid.uuid4()),
    	public_id = data['public_id'],
    	group_id = data['group_id'],
    	priority = data['priority'],
    	status='open',
    	duedate = dueDate,
    	created_date = datetime.datetime.utcnow(),
    	task_Desc = data['task_Desc'],
    	assigned_to = get_email(data['public_id']),
    	created_by = get_email(data['public_id'])
    	)
	save_changes(new_task)
	response_object = {
	'taskid':new_task.taskid,
	'status':'success',
	'message':'Successfully created.'
	}
	return response_object,201

def get_email(public_id):
	user = User.query.filter_by(public_id=public_id).first()
	return user.first_name

def save_changes(data):
    db.session.add(data)
    db.session.commit()

def update_task(data):
	task = Task.query.filter_by(taskid=data['taskid']).first()
	update_items=''
	if task:
		if data['priority']:
			task.priority=data['priority']
			db.session.commit()
			update_items+='priority'
		if data['status']:
			task.status = get_status(data['status'])
			db.session.commit()
			update_items+=' status'
		if data['duedate']:
			task.duedate = datetime.datetime.strptime(data['duedate'],'%d-%m-%Y')
			db.session.commit()
			update_items+=' duedate'
		if data['assigned_to']:
			task.assigned_to = get_name(data['assigned_to'])
			db.session.commit()
			update_items+=' assigned_to'
		if update_items=='':
			response_object={
			'status':'success',
			'message':'Nothing to update'
			}
			return response_object,201
		update_items+=' got updated.'
		response_object = {
		'status':'success',
		'message':update_items
		}
		return response_object,201



def get_status(status):
	s=''
	if status=='0':
		s='open'
	elif status=='1':
		s='in progress'
	else:
		s='complete'
	return s

def get_name(email):
	user = User.query.filter_by(email=email).first()
	return user.first_name

def get_public_id(email):
	user = User.query.filter_by(email=email).first()
	return user.public_id

def get_task_list(public_id,group_id):
	if group_id!="":
		tasks = Task.query.filter_by(public_id=public_id,group_id_value=group_id).all()
		a=[]
		for i in range(len(tasks)):
			response_object={
			'task_Desc':tasks[i].task_Desc,
			'duedate':str(tasks[i].duedate),
			'status':tasks[i].status,
			'priority':tasks[i].priority_column,
			'created_by':tasks[i].created_by,
			'assigned_to':tasks[i].assigned_to
			}
			a.append(response_object)
		return a,201
	else:
		tasks = Task.query.filter_by(public_id=public_id).all()
		a=[]
		for i in range(len(tasks)):
			response_object={
			'task_Desc':tasks[i].task_Desc,
			'duedate':str(tasks[i].duedate),
			'status':tasks[i].status,
			'priority':tasks[i].priority_column,
			'created_by':tasks[i].created_by,
			'assigned_to':tasks[i].assigned_to
			}
			a.append(response_object)
		return a,201


def delete_task(task_id):
	tasks = Task.query.filter_by(taskid = task_id).first()
	if tasks:
		db.session.delete(tasks)
		db.session.commit()
		response_object = {
		'status':'success',
		'message':'task deleted successfully.'
		}
		return response_object,201
	else:
		response_object = {
		'status':'fail',
		'message':'Invalid task id'
		}
	return response_object,409

def notification():
	NextDay_Date = str((datetime.datetime.today() + datetime.timedelta(days=1)).date())
	NextDay_Date=NextDay_Date.split('-')
	NextDay_time = str((datetime.datetime.today() + datetime.timedelta(days=1)).time())
	NextDay_time=NextDay_time.split(':')
	tasks = Task.query.filter_by().all()
	notify=[]
	for i in range(len(tasks)):
		date = str(tasks[i].duedate.date()).split('-')
		time = str(tasks[i].duedate.time()).split(':')
		if date[0]==NextDay_Date[0] and date[1]==NextDay_Date[1] and ((int(NextDay_Date[2])-int(date[2]))<1) and (int(NextDay_time[0])-int(time[0]))<=1:
			notify.append(tasks[i])

	for i in range(len(notify)):
		public_id=notify[i].public_id
		user=User.query.filter_by(public_id=public_id).first()

		s = smtplib.SMTP('smtp.gmail.com', 587)
		s.starttls()
		s.login("todolist.mails@gmail.com", "todolist")
		message = ("Dear "+user.first_name+",\n\n Your task named \" "+notify[i].task_Desc +"\" is still pending and it's duedate is "+str(notify[i].duedate))+". Please complete it on time. \n\n Regards, \nTo-DoList company."

		s.sendmail("todolist.mails@gmail.com", user.email, message)
		  
		s.quit()

	response_object={
	'status':'success',
	'message':"mails has been sent to users"
	}
	return response_object,201