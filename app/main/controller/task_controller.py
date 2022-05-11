from flask import request
from flask_restx import Resource

from ..util.dto import TaskDto
from ..service.task_service import save_new_task,update_task,get_task_list,get_public_id,delete_task,notification

api =TaskDto.api
_task = TaskDto.task
_task_update= TaskDto.update_task
_task_list = TaskDto.list_task
_task_delete = TaskDto.delete_task
@api.route('/create_task/')
class CreateTask(Resource):
	@api.response(201,'Task successfully created.')
	@api.doc('create a new task')
	@api.expect(_task,validate=True)
	def post(self):
		data = request.json
		return save_new_task(data)


@api.route('/update_task/')
class UpdateTask(Resource):
	@api.response(201,'Task updated successfully.')
	@api.doc('update a task')
	@api.expect(_task_update,validate=True)
	def post(self):
		data=request.json
		return update_task(data)


@api.route('/list_task/')
class ListTask(Resource):
	@api.response(201,'Lists of tasks')
	@api.expect(_task_list,validate=True)
	def post(self):
		data=request.json
		public_id = get_public_id(data['email'])
		return get_task_list(public_id,data['group_id'])

    
@api.route('/delete_task')
class DeleteTask(Resource):
	@api.response(201,'delete tasks')
	@api.expect(_task_delete,validate=True)
	def post(self):
		data=request.json
		task_id = data['taskid']
		return delete_task(task_id)

@api.route('/notification')
class Notification(Resource):
	@api.response(201,'Notification send')
	def post(self):
		return notification()