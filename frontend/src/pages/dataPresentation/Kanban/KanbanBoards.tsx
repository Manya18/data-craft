import { useState, DragEvent, ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import "./KanbanBoard.css";
import ModalLayout from "../../../templates/ModalLayout";
import { t } from "i18next";

export interface Card {
    id: string;
    title: string;
    status: string;
    deadline: string;
    avatarPath?: string;
}
export interface Column {
    id: number;
    title: string;
    color: string;
}

interface DefaultCardProps {
    title: string;
    avatarPath?: string;
    id: string;
    status: string;
    deadline: string;
    color: string;
    handleDragStart: (
        e: any,
        card: { title: string; id: string; status: string; deadline: string }
    ) => void;
    renderAvatar?: (avatarPath?: string) => ReactNode;
    children?: ReactNode;
}

interface KanbanBoardProps {
    columns: Column[];
    initialCards: Card[];
    columnForAddCard: string;
    onCardClick?: (cardId: string) => void;
    onCardMove?: (cardId: string, newStatus: string) => void;
    onCardEdit?: (cardId: string, newTitle: string) => void;
    onCardDelete?: (cardId: string) => void;
    onTaskAddedCallback?: (title: string) => void;
    renderCard?: (
        card: Card,
        handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void
    ) => ReactNode;
    renderAvatar?: (avatarPath?: string) => ReactNode;
    renderAddCard?: (
        column: string,
        setCards: React.Dispatch<React.SetStateAction<Card[]>>
    ) => ReactNode;
}
interface ColumnProps {
    title: string;
    column: string;
    cards: Card[];
    columnForAddCard: string;
    setCards: React.Dispatch<React.SetStateAction<Card[]>>;
    color: string;
    onCardClick?: (cardId: string) => void;
    onCardMove?: (cardId: string, newStatus: string) => void;
    onCardEdit?: (cardId: string, newTitle: string) => void;
    onCardDelete?: (cardId: string) => void;
    onTaskAddedCallback?: (title: string) => void;
    renderCard?: (
        card: Card,
        handleDragStart: (e: DragEvent<HTMLDivElement>, card: Card) => void
    ) => ReactNode;
    renderAvatar?: (avatarPath?: string) => ReactNode;
    renderAddCard?: (
        column: string,
        setCards: React.Dispatch<React.SetStateAction<Card[]>>
    ) => ReactNode;
}

const KanbanBoard = ({
    columns: initialColumns,
    columnForAddCard,
    initialCards,
    onCardClick,
    onCardMove,
    onCardEdit,
    onCardDelete,
    onTaskAddedCallback,
    renderCard,
    renderAvatar,
    renderAddCard,
}: KanbanBoardProps) => {
    const [cards, setCards] = useState<Card[]>(initialCards);
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [open, setOpen] = useState<boolean>(false);
    const [newColumnName, setNewColumnName] = useState<string>('');

    useEffect(() => {
        setCards(initialCards);
    }, [initialCards]);
    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

    const addNewColumn = () => {
        const newColumnId = columns.length + 1;
        const newColumn = {
            id: newColumnId,
            title: newColumnName,
            color: '#ccc',
        };
        setColumns([...columns, newColumn]);
        setNewColumnName('');
        handleCloseModal();
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        p: 4,
        maxHeight: "80vh",
    };

    const handleOpenModal = () => {
        setOpen(true);
    };
    const handleCloseModal = () => {
        setOpen(false);
    };

    return (
        <div className="kanban">
            <button className="add-button" onClick={handleOpenModal}>{t(`kanban.addColumn`)}</button>
            <div className="kanban-board">
                {columns.map((column) => (
                    <ColumnComponent
                        key={column.id}
                        title={column.title}
                        column={column.title}
                        cards={cards}
                        setCards={setCards}
                        color={column.color}
                        onCardClick={onCardClick}
                        onCardMove={onCardMove}
                        onCardEdit={onCardEdit}
                        onCardDelete={onCardDelete}
                        renderCard={renderCard}
                        renderAvatar={renderAvatar}
                        renderAddCard={renderAddCard}
                        onTaskAddedCallback={onTaskAddedCallback}
                        columnForAddCard={columnForAddCard}
                    />
                ))}
                {open && <ModalLayout open={open} setOpen={setOpen} style={style}>
                    <div>
                        <input
                            type="text"
                            value={newColumnName}
                            onChange={(e) => setNewColumnName(e.target.value)}
                            placeholder={t(`kanban.enterName`)}
                        />
                        <button onClick={addNewColumn}>{t(`kanban.addColumn`)}</button>
                        <button onClick={handleCloseModal}>{t(`close`)}</button>
                    </div>
                </ModalLayout>}
            </div>
        </div>
    );
};

const ColumnComponent: React.FC<ColumnProps> = ({
    title,
    column,
    cards,
    setCards,
    color,
    onCardMove,
    renderAvatar,
}) => {
    const filteredCards = cards.filter((card) => card.status === column);
    const [active, setActive] = useState(false);
    const handleDragStart = (e: DragEvent<HTMLDivElement>, card: Card) => {
        e.dataTransfer.setData("cardId", card.id);
    };
    const [open, setOpen] = useState<boolean>(false);
    const [selectedCard, setSelectedCard] = useState<Card | null>(null);

    const handleDragEnd = (e: DragEvent<HTMLDivElement>) => {
        const cardId = e.dataTransfer.getData("cardId");

        setActive(false);
        clearHighlights();

        const indicators = getIndicators();
        const { element } = getNearestIndicator(e, indicators);

        const before = element.dataset.before || "-1";

        if (before !== cardId) {
            let copy = [...cards];

            let cardToTransfer = copy.find((c) => c.id === cardId);
            if (!cardToTransfer) return;
            cardToTransfer = { ...cardToTransfer, status: column };

            copy = copy.filter((c) => c.id !== cardId);

            const moveToBack = before === "-1";

            if (moveToBack) {
                copy.push(cardToTransfer);
            } else {
                const insertAtIndex = copy.findIndex((el) => el.id === before);
                if (insertAtIndex === undefined) return;

                copy.splice(insertAtIndex, 0, cardToTransfer);
            }

            setCards(copy);
            onCardMove?.(cardId, column);
        }
    };

    const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        highlightIndicator(e);
        setActive(true);
    };

    const clearHighlights = (els?: HTMLElement[]) => {
        const indicators = els || getIndicators();
        indicators.forEach((i: any) => {
            i.style.opacity = "0";
        });
    };

    const highlightIndicator = (e: DragEvent<HTMLDivElement>) => {
        const indicators = getIndicators();
        clearHighlights(indicators);
        const el = getNearestIndicator(e, indicators);
        el.element.style.opacity = "1";
    };

    const getNearestIndicator = (
        e: DragEvent<HTMLDivElement>,
        indicators: HTMLElement[]
    ) => {
        const DISTANCE_OFFSET = 50;
        const el = indicators.reduce(
            (closest, child) => {
                const box = child.getBoundingClientRect();
                const offset = e.clientY - (box.top + DISTANCE_OFFSET);
                if (offset < 0 && offset > closest.offset) {
                    return { offset: offset, element: child };
                } else {
                    return closest;
                }
            },
            {
                offset: Number.NEGATIVE_INFINITY,
                element: indicators[indicators.length - 1],
            }
        );

        return el;
    };

    const handleDragLeave = () => {
        clearHighlights();
        setActive(false);
    };

    const getIndicators = (): HTMLElement[] => {
        return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
    };

    const style = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        bgcolor: "background.paper",
        p: 4,
        maxHeight: "80vh",
    };

    const handleTaskClick = (card: Card) => {
        setSelectedCard(card);
        setOpen(true);
    };

    const handleCloseModal = () => {
        setOpen(false);
        setSelectedCard(null);
    };

    return (
        <div
            className={`kanban-column ${active ? "active" : ""}`}
            onDrop={handleDragEnd}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
        >
            <div className="column-title" style={{ backgroundColor: color }}>
                {title} <span className="counter">{filteredCards.length}</span>
            </div>
            <div className={`column-content ${active ? "active" : ""}`}>
                {filteredCards.map((card) => (
                    <div key={card.id}
                        onDoubleClick={() => handleTaskClick(card)}
                    >
                        <DropIndicator beforeId={card.id} column={column} />
                        <DefaultCard
                            {...card}
                            deadline={card.deadline!}
                            handleDragStart={handleDragStart}
                            renderAvatar={renderAvatar}
                            color={color}
                        >
                        </DefaultCard>
                        {open && selectedCard && (
                            <ModalLayout open={open} setOpen={setOpen} style={style}>
                                <h2>{selectedCard.title}</h2>
                                <div>{new Date(selectedCard.deadline).toLocaleDateString()}</div>
                                <button onClick={handleCloseModal}>Close</button>
                            </ModalLayout>
                        )}
                    </div>
                ))}
                <DropIndicator beforeId={-1} column={column} />
            </div>
        </div>
    );
};

const DefaultCard = ({
    title,
    avatarPath,
    id,
    status,
    deadline,
    color,
    handleDragStart,
    renderAvatar,
    children,
}: DefaultCardProps) => {
    return (
        <motion.div
            layout
            layoutId={id}
            draggable="true"
            onDragStart={(e) => handleDragStart(e, { title, id, status, deadline })}
            className="card"
        >
            <div className="card-info">
                <div className={"card-title"}>{title}</div>
                <div className="status-deadline">
                    <div className="status">
                        <div className="status-indicator" style={{ backgroundColor: color }}></div>
                        <div className="status-text">{status}</div>
                    </div>
                    <div className="deadline">
                        <img src="https://img.icons8.com/ios-filled/16/000000/calendar.png" alt="calendar" className="deadline-icon" />
                        {new Date(deadline).toLocaleDateString()}
                    </div>
                    <div className="avatar">
                        {renderAvatar ? (
                            renderAvatar(avatarPath)
                        ) : (
                            <DefaultAvatar avatarPath={avatarPath} />
                        )}
                    </div>
                </div>
            </div>
            {children}
        </motion.div>
    );
};

const DefaultAvatar = ({ avatarPath }: { avatarPath?: string }) => {
    if (!avatarPath) return null;
    return (
        <img
            src={avatarPath}
            alt={`img ${avatarPath}`}
            className="avatar"
            style={{ borderRadius: "50%", width: "40px", height: "40px" }}
        />
    );
};

const DropIndicator = ({
    beforeId,
    column,
}: {
    beforeId: string | number;
    column: string;
}) => {
    return (
        <div
            data-before={beforeId}
            data-column={column}
            className="drop-indicator"
        ></div>
    );
};

export default KanbanBoard;