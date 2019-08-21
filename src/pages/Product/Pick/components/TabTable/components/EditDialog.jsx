import React, {useState, useRef, useEffect} from 'react';
import {Dialog, Button, Form, Message, Select, DatePicker, Timeline, Radio} from '@alifd/next';
import {apiPickAddBatch} from "@/api/product/pick";

const FormItem = Form.Item;
import IceContainer from '@icedesign/container'
import {apiRecordGetAll} from "@/api/product/record";

const TimelineItem = Timeline.Item;
const RadioGroup = Radio.Group;

export default function EditDialog(props) {
  const {index, record, getFormValues} = props;
  const [visible, setVisible] = useState(false);
  const [selectDate, setSelectDate] = useState('');
  const [recordList, setRecordList] = useState([]);

  useEffect(() => {
    setSelectDate(getRecentDate(1));

    // 获取生产记录, 做时间轴
    apiRecordGetAll({
      endTime: record.createTime.substring(0, 10),
      fieldId: record.fieldId,
    }).then(res => setRecordList(res.list))
  }, []);


  /**
   * 获取近num个月的时间，格式2019-09-01
   * @param num
   */
  const getRecentDate = (num) => {
    let currentDate = new Date();
    currentDate.setMonth(currentDate.getMonth() - num);
    return currentDate.Format('yyyy-MM-dd');
  };

  const handleSubmit = () => {
    apiPickAddBatch(record, selectDate).then(res => {
      // 添加批次成功
      Message.success('添加批次成功')
      getFormValues();
    }).catch(err => {
      Message.error('添加失败，' + err)
    });
    setVisible(false);
  };

  const onSelectChange = (value) => {
    setSelectDate(getRecentDate(value));
  };

  const onSelectDateChange = (value) => {
    console.debug('current date', value);
    setSelectDate(value)
  };

  const onRadioChange = (time) => {
    console.debug('click time: ' + time);
    setSelectDate(time.substring(0,10))
  };

  const onOpen = (index, record) => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const formItemLayout = {
    labelCol: {
      fixedSpan: 6,
    },
    wrapperCol: {
      span: 14,
    },
  };


  return (
    <div style={styles.editDialog}>
      <Button
        size="small"
        type="primary"
        onClick={() => onOpen(index, record)}
      >
        生成批次
      </Button>
      <Dialog
        style={{width: 640}}
        visible={visible}
        onOk={handleSubmit}
        closeable="esc,mask,close"
        onCancel={onClose}
        onClose={onClose}
        title="生成批次"
        isFullScreen={true}
      >
        <Form>
          <FormItem label={"起始时间："} {...formItemLayout} required>
            <DatePicker style={{width: 400}} value={selectDate} onChange={onSelectDateChange}/>
          </FormItem>

          <FormItem label="起始时间：" {...formItemLayout} required>
            <Select style={{width: 400}} defaultValue={"1"} name="select" onChange={onSelectChange}>
              <Select.Option value={"1"}>一个月内</Select.Option>
              <Select.Option value={"2"}>两个月内</Select.Option>
              <Select.Option value={"3"}>三个月内</Select.Option>
              <Select.Option value={"6"}>六个月内</Select.Option>
              <Select.Option value={"12"}>一年内</Select.Option>
            </Select>
          </FormItem>
        </Form>

        <IceContainer title={"生产记录时间轴"}>
          <RadioGroup onChange={onRadioChange}>
          <Timeline fold={[{foldArea: [1, 2], foldShow: false}, {foldArea: [5], foldShow: false}]}>
              {recordList.map((item, index) => {
                return (
                  <TimelineItem title={"操作记录：" + item.operation} time={item.createTime}
                    dot={<Radio value={item.createTime}/>}
                  />
                )
              })}
          </Timeline>
          </RadioGroup>
        </IceContainer>
      </Dialog>
    </div>
  );
}

const styles = {
  editDialog: {
    display: 'inline-block',
    marginRight: '5px',
  },
};
