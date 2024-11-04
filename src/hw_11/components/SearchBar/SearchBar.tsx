import React from 'react';
import { SearchProps, SortCriteria } from '../../types/types';
import './SearchBar.css';

const SearchBar: React.FC<SearchProps> = ({ searchQuery, setSearchQuery, handleSort }) => {
    return (
        <div className="search-bar">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search notes..."
            />
            <select onChange={(e) => handleSort(e.target.value as SortCriteria)}> 
                <option value={SortCriteria.CreatedAt}>Sort by Date</option>
                <option value={SortCriteria.Status}>Sort by Status</option>
            </select>
        </div>
    );
};

export default SearchBar;
