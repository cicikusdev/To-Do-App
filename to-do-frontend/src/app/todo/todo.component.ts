import { Component, OnInit } from '@angular/core';
import { TodoService } from '../services/todo.service';
import { Todo } from '../models/todo';

@Component({
  selector: 'app-todo',
  standalone: false,

  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  newTodo: Todo = { title: '', description: '', completed: false };
  todoToEdit: Todo | null = null;

  constructor(private todoService: TodoService) {}


  ngOnInit(): void {
    this.todoService.getTodos().subscribe((todos) => {
      this.todos = todos;
    });
  }

  addTodo(): void {
    if(this.newTodo.title !== null && this.newTodo.description !== null){

      this.todoService.createTodo(this.newTodo).subscribe((createdTodo) => {
        this.todos.push(createdTodo);
        this.newTodo = { title: '', description: '', completed: false };
      });
    }
  }

  deleteTodo(id: number): void {
    this.todoService.deleteTodoById(id).subscribe(() => {
      this.todos = this.todos.filter((todo) => todo.id !== id);
    });
  }

  editTodo(todo: Todo): void {
    this.todoToEdit = { ...todo };
  }

  updateTodo(): void {
    if (this.todoToEdit) {
      this.todoService.updateTodo(this.todoToEdit.id!, this.todoToEdit).subscribe((updatedTodo) => {
        const index = this.todos.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
          this.todos[index] = updatedTodo;
        }
        this.todoToEdit = null;
      });
    }
  }

  cancelEdit(): void {
    this.todoToEdit = null;
  }

  updateTodoStatus(todo: Todo): void {
    todo.completed = !todo.completed;
    this.todoService.updateTodo(todo.id!, todo).subscribe((updatedTodo) => {
      const index = this.todos.findIndex(t => t.id === updatedTodo.id);
      if (index !== -1) {
        this.todos[index] = updatedTodo;
      }
    });
  }

  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  markAsCompleted(todo: any) {
    todo.completed = !todo.completed; // Tamamlama durumunu değiştir
  }

}
