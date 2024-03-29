import React from 'react';
import PropTypes from 'prop-types';
import {Table} from '@alifd/next';

export default function CustomTable(props) {
  const {columns, key} = props;
  const renderColumns = () => {
    return columns.map((item) => {
      if (typeof item.render === 'function') {
        return (
          <Table.Column
            title={item.title}
            key={item.key}
            cell={item.render}
            width={item.width || 150}
          />
        );
      }

      return (
        <Table.Column
          key={item.key}
          title={item.title}
          dataIndex={item.dataIndex}
          width={item.width || 150}
        />
      );
    });
  };

  return <Table {...props}>{renderColumns()}</Table>;
}

CustomTable.propTypes = {
  dataSource: PropTypes.array,
  columns: PropTypes.array.isRequired,
};

CustomTable.defaultProps = {
  dataSource: [],
};
