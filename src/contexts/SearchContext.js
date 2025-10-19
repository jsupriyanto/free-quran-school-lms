"use client";

import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export const SearchProvider = ({ children }) => {
  const [globalSearchTerm, setGlobalSearchTerm] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);

  const updateSearch = (searchTerm) => {
    setGlobalSearchTerm(searchTerm);
    setIsSearchActive(!!searchTerm);
  };

  const clearSearch = () => {
    setGlobalSearchTerm('');
    setIsSearchActive(false);
  };

  return (
    <SearchContext.Provider value={{
      globalSearchTerm,
      isSearchActive,
      updateSearch,
      clearSearch,
      setGlobalSearchTerm
    }}>
      {children}
    </SearchContext.Provider>
  );
};