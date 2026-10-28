'use client';

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { BOOKS } from '../data/books';
import { IconBookmark, IconClose, IconBook, IconArrowLeft } from './Icons';

export default function BoardsModal() {
  const {
    boards,
    isBoardsModalOpen,
    setIsBoardsModalOpen,
    createBoard,
    setActiveBoardFilter,
    openBookModal,
  } = useApp();

  const [isCreating, setIsCreating] = useState(false);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDesc, setNewBoardDesc] = useState('');
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  if (!isBoardsModalOpen) return null;

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newBoardName.trim()) return;
    createBoard(newBoardName.trim(), newBoardDesc.trim());
    setNewBoardName('');
    setNewBoardDesc('');
    setIsCreating(false);
  };

  const currentBoard = boards.find((b) => b.id === selectedBoardId);
  const pinnedBooks = currentBoard
    ? BOOKS.filter((book) => currentBoard.bookIds.includes(book.id))
    : [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => {
        setIsBoardsModalOpen(false);
        setSelectedBoardId(null);
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl bg-[var(--bg-card)] text-[var(--text-main)] rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-2xl border border-[var(--border-subtle)] max-h-[85vh] overflow-y-auto animate-slide-up"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-[var(--border-subtle)]">
          <div className="flex items-center gap-2">
            <IconBookmark size={18} className="text-[#a66523]" />
            <h3 className="font-heading font-bold text-xl sm:text-2xl">
              {selectedBoardId && currentBoard ? currentBoard.name : 'Your Saved Reading Boards'}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            {selectedBoardId && (
              <button
                onClick={() => setSelectedBoardId(null)}
                className="px-3 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors flex items-center gap-1"
              >
                <IconArrowLeft size={13} />
                <span>All Boards</span>
              </button>
            )}
            <button
              onClick={() => {
                setIsBoardsModalOpen(false);
                setSelectedBoardId(null);
              }}
              className="w-8 h-8 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-hover)] flex items-center justify-center cursor-pointer transition-colors"
            >
              <IconClose size={14} />
            </button>
          </div>
        </div>

        {/* Board Books Detail View */}
        {selectedBoardId && currentBoard ? (
          <div className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-xs sm:text-sm text-[var(--text-muted)]">
                {currentBoard.description || 'Custom collection of sacred scriptures'}
              </p>
              <button
                onClick={() => {
                  setActiveBoardFilter(currentBoard.id);
                  setIsBoardsModalOpen(false);
                }}
                className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#e60023] text-white hover:bg-[#ad081b] cursor-pointer transition-colors"
              >
                Filter Main Feed
              </button>
            </div>

            {pinnedBooks.length === 0 ? (
              <div className="py-12 text-center text-[var(--text-muted)]">
                <p className="text-sm">No treatises saved to this board yet.</p>
                <p className="text-xs mt-1">Hover over any book on the feed and click &quot;Save&quot;.</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 pt-2">
                {pinnedBooks.map((book) => (
                  <div
                    key={book.id}
                    onClick={() => {
                      setIsBoardsModalOpen(false);
                      openBookModal(book);
                    }}
                    className="p-2.5 rounded-xl bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] cursor-pointer transition-colors border border-[var(--border-subtle)] flex flex-col justify-between"
                  >
                    <div className="w-full aspect-[1/1.4] rounded-lg overflow-hidden bg-neutral-100">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="pt-2">
                      <h4 className="text-xs font-heading font-bold truncate text-[var(--text-main)]">
                        {book.title}
                      </h4>
                      <p className="text-[10px] text-[var(--text-muted)] truncate">{book.author}</p>
                      <p className="text-xs font-bold text-[var(--text-main)] mt-1">
                        Rs. {book.price.toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* List of Boards */
          <div className="pt-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-[var(--text-muted)]">
                {boards.length} Boards Created
              </span>
              <button
                onClick={() => setIsCreating(!isCreating)}
                className="px-3.5 py-1.5 rounded-full text-xs font-semibold bg-[var(--bg-input)] hover:bg-[#e60023] hover:text-white cursor-pointer transition-colors"
              >
                {isCreating ? 'Cancel' : '+ Create New Board'}
              </button>
            </div>

            {/* Create Board Inline Form */}
            {isCreating && (
              <form onSubmit={handleCreate} className="p-4 rounded-xl bg-[var(--bg-wash)] border border-[var(--border-subtle)] space-y-3 animate-slide-up">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[var(--text-muted)]">New Reading Board</h4>
                <input
                  type="text"
                  placeholder="Board Name (e.g. Historical Chronicles, Buddhist Treatises)"
                  value={newBoardName}
                  onChange={(e) => setNewBoardName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-full bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                  required
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  value={newBoardDesc}
                  onChange={(e) => setNewBoardDesc(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-full bg-[var(--bg-card)] text-[var(--text-main)] border border-[var(--border-subtle)] outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-[#e60023] text-white hover:bg-[#ad081b] cursor-pointer"
                >
                  Create Board
                </button>
              </form>
            )}

            {/* Boards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {boards.map((board) => (
                <div
                  key={board.id}
                  onClick={() => setSelectedBoardId(board.id)}
                  className="p-3.5 rounded-xl bg-[var(--bg-wash)] hover:bg-[var(--bg-hover)] border border-[var(--border-subtle)] cursor-pointer transition-colors flex items-center justify-between"
                >
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[var(--text-main)]">
                      {board.name}
                    </h4>
                    <p className="text-xs text-[var(--text-muted)] line-clamp-1 mt-0.5">
                      {board.description || 'Collection of scriptures'}
                    </p>
                    <span className="inline-block mt-2 text-[11px] font-semibold text-[#e60023]">
                      {board.bookIds.length} Saved Treatises &rarr;
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-lg bg-[var(--bg-card)] border border-[var(--border-subtle)] flex items-center justify-center text-[#a66523] shrink-0">
                    <IconBook size={18} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
