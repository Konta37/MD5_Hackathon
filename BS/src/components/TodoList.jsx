import { Button, Modal, notification, Input } from "antd";
import React, { useEffect, useState } from "react";

export default function TodoList() {
  const [todoList, setTodoList] = useState(
    () => JSON.parse(localStorage.getItem("todoList")) || []
  );
  const [currentTodoList, setCurrentTodoList] = useState({ name: "" });
  const [isEditing, setIsEditing] = useState(false); // Track if editing is in progress
  const [editingTodo, setEditingTodo] = useState(null); // Track the task being edited

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setCurrentTodoList({ ...currentTodoList, [name]: value });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (currentTodoList.name === "") return; // Prevent adding empty tasks
    const newTodoList = {
      id: Math.floor(Math.random() * 100),
      name: currentTodoList.name,
      status: "In Processing",
    };
    setTodoList([...todoList, newTodoList]); // Update the todoList
    setCurrentTodoList({ name: "" }); // Clear input field
  };

  const showDeleteConfirm = (id) => {
    Modal.confirm({
      title: 'Are you sure you want to delete this task?',
      content: 'This action cannot be undone.',
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        handleDelete(id);
      },
    });
  };

  const handleDelete = (id) => {
    const updatedTodoList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedTodoList);

    // Show success notification
    notification.success({
      message: 'Delete Successful',
      description: 'The task has been successfully deleted.',
      placement: 'topRight',
    });
  };

  const handleCheck = (id) => {
    const updatedTodoList = todoList.map((todo) =>
      todo.id === id
        ? { ...todo, status: todo.status === "Done" ? "In Processing" : "Done" }
        : todo
    );
    setTodoList(updatedTodoList);
  };

  const handleEdit = (todo) => {
    setEditingTodo(todo); // Set the task being edited
    setIsEditing(true); // Open the modal
  };

  const handleSaveEdit = () => {
    if (editingTodo.name === ""){
      notification.error({
        message: 'Edit Fail',
        description: 'The input has been empty.',
        placement: 'topRight',
      });
      setIsEditing(false); // Close the modal
      return;
    }
    const updatedTodoList = todoList.map((todo) =>
      todo.id === editingTodo.id ? { ...todo, name: editingTodo.name } : todo
    );
    setTodoList(updatedTodoList);
    setIsEditing(false); // Close the modal
    notification.success({
      message: 'Edit Successful',
      description: 'The task has been successfully updated.',
      placement: 'topRight',
    });
  };

  const handleChangeEditInput = (e) => {
    setEditingTodo({ ...editingTodo, name: e.target.value }); // Update the task name during edit
  };

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-6 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold mb-4 text-center">
            List Task
          </h1>
          <form
            className="flex justify-between mb-4 gap-3"
            onSubmit={handleAdd}
          >
            <input
              type="text"
              className="border border-gray-300 rounded p-2 w-full"
              placeholder="Nhập tên công việc"
              onChange={handleChangeInput}
              name="name"
              value={currentTodoList.name}
            />
            <Button
              className="bg-blue-500 text-white font-bold"
              htmlType="submit"
            >
              Add
            </Button>
          </form>
          {todoList.length === 0 ? (
            <h1 className="text-center text-gray-500">No data</h1>
          ) : (
            <table className="min-w-full border-collapse border border-gray-300">
              <div id="checklist">
                <div className="mb-2">
                  {todoList.map((todo, index) => (
                    <div
                      className="flex justify-between items-center mb-2"
                      key={todo.id}
                    >
                      {/* Left side: Input and Label */}
                      <div className="flex items-center">
                        <input
                          name="r"
                          type="checkbox"
                          id={todo.id}
                          className="mr-2"
                          checked={todo.status === "Done"} // Checkbox is checked if status is "Done"
                          onChange={() => handleCheck(todo.id)} // Toggle the status on change
                        />
                        <label htmlFor={todo.id} className="flex-grow text-left">
                          {todo.name}
                        </label>
                      </div>
                      {/* Right side: Buttons */}
                      <div className="flex">
                        <button
                          className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 mr-2"
                          onClick={() => handleEdit(todo)} // Open the modal to edit the task
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                          onClick={() => showDeleteConfirm(todo.id)} // Show confirm modal before deletion
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </table>
          )}
          {todoList.length !== 0 ? (
            <h2 className="text-1xl font-light mb-4">
            Task has done: {todoList.filter((item) => item.status === "Done").length}/
            {todoList.length}
          </h2>
          ):(<></>)}
          
        </div>
      </div>

      {/* Edit Modal */}
      <Modal
        title="Edit Task"
        visible={isEditing}
        onOk={handleSaveEdit} // Save the changes
        onCancel={() => setIsEditing(false)} // Close the modal without saving
        okText="Save"
        cancelText="Cancel"
      >
        <Input
          value={editingTodo?.name || ""} // Input for editing task name
          onChange={handleChangeEditInput} // Update task name on change
        />
      </Modal>
    </>
  );
}
