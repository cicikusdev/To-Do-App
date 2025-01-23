package com.umayece.todolist_demo.repository;

import com.umayece.todolist_demo.model.Todo;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TodoRepository extends JpaRepository<Todo, Long> {
}
