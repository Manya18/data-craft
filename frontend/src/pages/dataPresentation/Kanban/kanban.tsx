import React from 'react';
import { Card, Column } from 'react-custom-kanban-board';
import KanbanBoard from './KanbanBoards';
import { t } from 'i18next';

// запрос к таблице статусов
const columns: Column[] = [
    { id: 1, title: "To Do", color: "#f0ad4e" },
    { id: 2, title: "In Progress", color: "#5bc0de" },
    { id: 3, title: "Done", color: "#5cb85c" },
];

// запрос к таблице задач
const initialCards: Card[] = [
    {
        id: "1",
        title: "Task 1",
        status: "To Do",
        deadline: "2024-10-20T14:30:00Z",
        avatarPath: "https://i.pravatar.cc/40?img=1",
    },
    {
        id: "2",
        title: "Task 2",
        status: "In Progress",
        deadline: "2024-10-20T14:30:00Z",
        avatarPath: "https://i.pravatar.cc/40?img=2",
    },
];

const Board = () => {
    return (
        <div>
            <h3>{t(`kanban.title`)}</h3>
            <KanbanBoard
                columns={columns}
                initialCards={initialCards}
                columnForAddCard="todo"
            />
        </div>
    );
};

export default Board;