import React, { useState } from 'react';
import {Button} from '@alifd/next'

/**
 * 添加或修改
 * @param props
 *    isAdd 是添加还是修改
 * @returns {*}
 * @constructor
 */
export default function EditDialog(props) {
  const [visible, setVisible] = useState(false);
  const [isAdd, field] = props;

  const onOpen = (index, record) => {

  }



  return (
    <div style={styles.editDialog}>
      {
        isAdd? (<Button type="primary" size="large" onClick={onOpen}>新增</Button>)
          : (<Button size="small" type="primary" onClick={() => onOpen(index, record)}> 编辑</Button>)
      }



    </div>
  );
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px'
  }
}
