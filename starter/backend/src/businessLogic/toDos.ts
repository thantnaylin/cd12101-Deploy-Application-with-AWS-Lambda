import { AttachmentUtils } from "../dataLayer/attachmentUtils";
import { TodosAccess } from "../dataLayer/todoAccess";
import { TodoItem } from "../models/ToDoItems";
import { CreateTodoRequest } from "../requests/CreateToDoRequest";
import { UpdateTodoRequest } from "../requests/UpdateToDoRequest";

import * as uuid from 'uuid'

const todosAccess = new TodosAccess();

const attachmentUtils = new AttachmentUtils();

export async function createTodo(userId: string, todo: CreateTodoRequest): Promise<TodoItem> {
    const todoId = uuid.v4();
    const createdAt = new Date().toISOString();
    const done = false;

    return await todosAccess.createTodo({
        userId,
        todoId,
        createdAt,
        done,
        ...todo
    })
}

export async function getTodosForUser(userId: string): Promise<TodoItem[]> {
    return await todosAccess.getTodosForUSer(userId);
}

export async function updateTodo(userId: string, todoId: string, updatedTodo: UpdateTodoRequest): Promise<TodoItem> {
    return await todosAccess.updateTodo(userId, todoId, updatedTodo);
}

export async function deleteTodo(userId: string, todoId: string): Promise<TodoItem> {
    return await todosAccess.deleteTodo(userId, todoId);
}

export async function createAttachmentPresignedUrl(todoId: string, userId: string): Promise<string> {
    await todosAccess.updateAttachmentUrl(todoId, userId); // Update Todo attachment URL

    return await attachmentUtils.createAttachmentPresignedUrl(todoId);
}