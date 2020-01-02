import {Task} from "../models";
import {checkStatus} from "./check-status";

const Method = {
  GET: `GET`,
  POST: `POST`,
  PUT: `PUT`,
  DELETE: `DELETE`
};

export default class API {

  constructor(endPoint, authorization) {
    this._endPoint = endPoint;
    this._authorization = authorization;
  }

  /**
   * Get tasks list from server
   * @return {Promise<Array<Task>>} - promise that resolves with array of tasks
   */
  getTasks() {
    return this._send({url: `tasks`})
      .then((response) => response.json())
      .then(Task.parseTasks);
  }

  /**
   * Creates new task on server
   * @param {Task} task - task
   * @return {Promise<Task>} - promise that resolves to created task
   */
  createTask(task) {
    return this._send({
      url: `tasks`,
      method: Method.POST,
      body: JSON.stringify(task.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Task.parseTask);
  }

  /**
   * Updates task on server
   * @param {Task} task - task
   * @return {Promise<Task>} - promise that resolves to updated task
   */
  updateTask(task) {
    return this._send({
      url: `tasks/${task.id}`,
      method: Method.PUT,
      body: JSON.stringify(task.toRAW()),
      headers: new Headers({'Content-Type': `application/json`})
    })
      .then((response) => response.json())
      .then(Task.parseTask);
  }

  /**
   * Deletes task on server
   * @param {String} id - task id
   * @return {Promise<String>} - promise that resoves to deleted task id
   */
  deleteTask(id) {
    return this._send({url: `tasks/${id}`, method: Method.DELETE})
      .then((_) => id);
  }

  /**
   * Sends request to server
   * @return {Promise<Response>} - promise that resoves to server response if it is successfull
   */
  _send({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
