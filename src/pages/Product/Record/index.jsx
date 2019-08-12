import React, { Component } from 'react';
import ContentList from './components/ContentList';

export default function() {
  return (
    <div className="record-page">
      {/* 筛选和列表组合 */}
      <ContentList />
    </div>
  );
}
