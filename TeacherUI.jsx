// TeacherUI.jsx
// 教師 / 管理端全流程 React UI（僅 UI，無實際業務邏輯）
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Dropdown,
  Select,
  Card,
  Row,
  Col,
  Alert,
  Tabs,
  Timeline,
  Table,
  Tag,
  Button,
  Space,
  Typography,
  Descriptions,
  Input,
  Form,
  DatePicker,
  Radio,
  Checkbox,
} from 'antd';
import {
  AppstoreOutlined,
  TeamOutlined,
  AuditOutlined,
  BarChartOutlined,
  HeartOutlined,
  FlagOutlined,
  BellOutlined,
  SendOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// ======================= 主組件：教師端 UI =======================
export default function TeacherUI() {
  const [page, setPage] = useState('workbench');

  const menuItems = [
    { key: 'workbench', icon: <AppstoreOutlined />, label: '工作台' },
    { key: 'students', icon: <TeamOutlined />, label: '學生列表與画像' },
    { key: 'reviews', icon: <AuditOutlined />, label: '審核隊列' },
    { key: 'reports', icon: <BarChartOutlined />, label: '數據報表' },
    { key: 'aid', icon: <HeartOutlined />, label: '資助管理' },
    { key: 'party', icon: <FlagOutlined />, label: '黨建管理' },
    { key: 'notifications', icon: <BellOutlined />, label: '通知中心' },
  ];

  const userMenu = {
    items: [
      { key: 'profile', label: '個人中心' },
      { type: 'divider' },
      { key: 'logout', label: '退出登入' },
    ],
  };

  const pageTitleMap = {
    workbench: '教師 / 管理員工作台',
    students: '學生列表與綜合画像',
    reviews: '審核隊列',
    reports: '數據報表與導出',
    aid: '資助與貧困生管理',
    party: '黨建管理',
    notifications: '通知中心',
  };

  const renderPage = () => {
    switch (page) {
      case 'workbench':
        return <TeacherWorkbench />;
      case 'students':
        return <TeacherStudents />;
      case 'reviews':
        return <TeacherReviewQueue />;
      case 'reports':
        return <TeacherReports />;
      case 'aid':
        return <TeacherAid />;
      case 'party':
        return <TeacherParty />;
      case 'notifications':
        return <TeacherNotifications />;
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={240}>
        <div
          style={{
            height: 64,
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            color: '#fff',
            fontWeight: 600,
          }}
        >
          智慧雲 · 管理端
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[page]}
          items={menuItems}
          onClick={(e) => setPage(e.key)}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: '#fff',
            padding: '0 24px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 600 }}>
            {pageTitleMap[page] || '管理端'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Select
              defaultValue="college"
              style={{ width: 160 }}
              options={[
                { value: 'college', label: '全院' },
                { value: 'cs2201', label: '計科 2201 班' },
                { value: 'cs2202', label: '計科 2202 班' },
              ]}
            />
            <Dropdown menu={userMenu} placement="bottomRight">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  cursor: 'pointer',
                }}
              >
                <Avatar size="small">李</Avatar>
                <span>李老師 · 輔導員</span>
              </div>
            </Dropdown>
          </div>
        </Header>

        <Content style={{ background: '#f5f7fa', padding: 16 }}>
          {renderPage()}
        </Content>
      </Layout>
    </Layout>
  );
}

// ======================= 工作台 =======================
function TeacherWorkbench() {
  return (
    <div>
      <Row gutter={16}>
        <Col span={18}>
          <Row gutter={8} style={{ marginBottom: 16 }}>
            <Col span={6}>
              <TStatCard label="管理學生數" value={1280} suffix="人" />
            </Col>
            <Col span={6}>
              <TStatCard label="待審核事項" value={23} />
            </Col>
            <Col span={6}>
              <TStatCard label="本學期已通過綜測" value={860} suffix="人" />
            </Col>
            <Col span={6}>
              <TStatCard label="本學期資助發放" value={320} suffix="人次" />
            </Col>
          </Row>

          <Card title="綜測與評獎概覽" style={{ marginBottom: 16 }}>
            <ChartPlaceholder text="圖表佔位：綜測分布 / 評獎通過率" />
          </Card>

          <Card title="資助與貧困生情況">
            <ChartPlaceholder text="圖表佔位：各貧困等級人數 / 資助覆蓋率" />
          </Card>
        </Col>

        <Col span={6}>
          <Card title="待辦審核" style={{ marginBottom: 16 }}>
            <Tabs
              items={[
                {
                  key: 'comprehensive',
                  label: '綜測',
                  children: (
                    <Timeline>
                      <Timeline.Item>計科 2201 班 8 人等待初審</Timeline.Item>
                      <Timeline.Item>計科 2202 班 5 人等待初審</Timeline.Item>
                    </Timeline>
                  ),
                },
                {
                  key: 'poverty',
                  label: '貧困生',
                  children: (
                    <Timeline>
                      <Timeline.Item color="orange">
                        12 份貧困生材料距離截止不足 3 天
                      </Timeline.Item>
                    </Timeline>
                  ),
                },
              ]}
            />
          </Card>

          <Card title="異常預警">
            <Alert
              type="warning"
              showIcon
              style={{ marginBottom: 8 }}
              message="5 名學生多門課程成績明顯下降，建議關注學習情況。"
            />
            <Alert
              type="info"
              showIcon
              message="3 名貧困生已超 2 學期未更新家庭經濟材料，請提醒補充。"
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function TStatCard({ label, value, suffix }) {
  return (
    <Card>
      <div style={{ color: '#999', fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 22, fontWeight: 600, marginTop: 4 }}>
        {value}
        {suffix && <span style={{ fontSize: 14, marginLeft: 4 }}>{suffix}</span>}
      </div>
    </Card>
  );
}

function ChartPlaceholder({ text }) {
  return (
    <div
      style={{
        height: 220,
        background:
          'repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #f0f0f0 10px, #f0f0f0 20px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#999',
      }}
    >
      {text}
    </div>
  );
}

// ======================= 學生列表與画像 =======================
function TeacherStudents() {
  const columns = [
    { title: '姓名', dataIndex: 'name', width: 100 },
    { title: '學號', dataIndex: 'stuNo', width: 120 },
    { title: '班級', dataIndex: 'clazz', width: 120 },
    { title: '綜測排名', dataIndex: 'rank', width: 120 },
    { title: '貧困等級', dataIndex: 'povertyLevel', width: 120 },
    { title: '黨員狀態', dataIndex: 'party', width: 120 },
  ];

  const data = [
    {
      key: 1,
      name: '張三',
      stuNo: '20230001',
      clazz: '計科 2201',
      rank: '前 10%',
      povertyLevel: '困難',
      party: '發展對象',
    },
    {
      key: 2,
      name: '李四',
      stuNo: '20230002',
      clazz: '計科 2201',
      rank: '前 30%',
      povertyLevel: '特別困難',
      party: '積極分子',
    },
  ];

  const selected = data[0]; // 模擬選中第一個學生，展示右側画像

  return (
    <Row gutter={16}>
      <Col span={14}>
        <Card
          title="學生列表"
          extra={
            <Space>
              <Input.Search
                allowClear
                placeholder="按姓名 / 學號搜索（UI）"
                style={{ width: 220 }}
              />
              <Select
                defaultValue="all"
                style={{ width: 120 }}
                options={[
                  { value: 'all', label: '全部班級' },
                  { value: 'cs2201', label: '計科 2201' },
                ]}
              />
            </Space>
          }
        >
          <Table
            rowKey="key"
            dataSource={data}
            columns={columns}
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </Col>
      <Col span={10}>
        <Card title="學生綜合画像">
          <Descriptions column={1} size="small" style={{ marginBottom: 12 }}>
            <Descriptions.Item label="姓名">
              {selected.name}（{selected.stuNo}）
            </Descriptions.Item>
            <Descriptions.Item label="班級">
              {selected.clazz}
            </Descriptions.Item>
            <Descriptions.Item label="綜測排名">
              {selected.rank}
            </Descriptions.Item>
            <Descriptions.Item label="貧困等級">
              {selected.povertyLevel}
            </Descriptions.Item>
            <Descriptions.Item label="黨員狀態">
              {selected.party}
            </Descriptions.Item>
          </Descriptions>

          <Card
            size="small"
            title="能力雷達圖"
            style={{ marginBottom: 12 }}
          >
            <ChartPlaceholder text="個人能力雷達圖佔位" />
          </Card>

          <Card size="small" title="成長動態">
            <Timeline>
              <Timeline.Item>2025-12 · 校級三好學生</Timeline.Item>
              <Timeline.Item>2025-10 · ACM 省賽三等獎</Timeline.Item>
              <Timeline.Item>2025-06 · 志願服務 30 小時</Timeline.Item>
            </Timeline>
          </Card>
        </Card>
      </Col>
    </Row>
  );
}

// ======================= 審核隊列 =======================
function TeacherReviewQueue() {
  const comprehensiveData = [
    {
      key: 1,
      student: '張三',
      stuNo: '20230001',
      clazz: '計科 2201',
      type: '綜測申報',
      time: '2026-03-01 10:20',
      status: 'pending',
    },
  ];

  const povertyData = [
    {
      key: 1,
      student: '李四',
      stuNo: '20230002',
      clazz: '計科 2201',
      type: '貧困生初審',
      time: '2026-03-01 09:15',
      status: 'pending',
    },
  ];

  const awardData = [
    {
      key: 1,
      student: '王五',
      stuNo: '20230003',
      clazz: '計科 2202',
      type: '國家獎學金申請',
      time: '2026-02-28 16:00',
      status: 'pending',
    },
  ];

  const columns = [
    { title: '學生姓名', dataIndex: 'student', width: 100 },
    { title: '學號', dataIndex: 'stuNo', width: 120 },
    { title: '班級', dataIndex: 'clazz', width: 120 },
    { title: '申請類型', dataIndex: 'type' },
    { title: '提交時間', dataIndex: 'time', width: 180 },
    {
      title: '狀態',
      dataIndex: 'status',
      width: 100,
      render: () => <Tag color="orange">待審核</Tag>,
    },
    {
      title: '操作',
      width: 220,
      render: () => (
        <Space>
          <Button type="link" size="small">
            查看詳情
          </Button>
          <Button type="link" size="small" style={{ color: '#52c41a' }}>
            通過（UI）
          </Button>
          <Button type="link" size="small" danger>
            退回（UI）
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Card>
      <Tabs
        items={[
          {
            key: 'comprehensive',
            label: '綜測申報',
            children: (
              <Table
                rowKey="key"
                dataSource={comprehensiveData}
                columns={columns}
              />
            ),
          },
          {
            key: 'poverty',
            label: '貧困生認定',
            children: (
              <Table rowKey="key" dataSource={povertyData} columns={columns} />
            ),
          },
          {
            key: 'award',
            label: '評獎評優',
            children: (
              <Table rowKey="key" dataSource={awardData} columns={columns} />
            ),
          },
        ]}
      />
    </Card>
  );
}

// ======================= 數據報表與導出 =======================
function TeacherReports() {
  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          數據報表與導出
        </Title>
        <Text type="secondary">
          為學院提供學業、綜測、資助、黨建等統計報表，可導出 Excel / PDF。
        </Text>
      </Card>

      <Card style={{ marginBottom: 16 }} title="條件篩選">
        <Row gutter={16}>
          <Col span={6}>
            <Form layout="vertical">
              <Form.Item label="學年 / 學期">
                <Select
                  defaultValue="2024-2025"
                  options={[
                    { value: '2024-2025', label: '2024-2025 學年' },
                    { value: '2023-2024', label: '2023-2024 學年' },
                  ]}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={6}>
            <Form layout="vertical">
              <Form.Item label="報表類型">
                <Select
                  defaultValue="comprehensive"
                  options={[
                    { value: 'comprehensive', label: '綜測統計報表' },
                    { value: 'grade', label: '學業成績報表' },
                    { value: 'aid', label: '資助覆蓋率報表' },
                    { value: 'party', label: '黨建情況統計' },
                  ]}
                />
              </Form.Item>
            </Form>
          </Col>
          <Col span={12}>
            <Form layout="vertical">
              <Form.Item label="維度選擇">
                <Checkbox.Group
                  defaultValue={['class', 'gender']}
                  options={[
                    { label: '按班級', value: 'class' },
                    { label: '按專業', value: 'major' },
                    { label: '按年級', value: 'grade' },
                    { label: '按性別', value: 'gender' },
                  ]}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
        <Button type="primary">生成報表（UI）</Button>
      </Card>

      <Row gutter={16}>
        <Col span={14}>
          <Card title="報表數據可視化">
            <ChartPlaceholder text="柱狀圖 / 折線圖 / 雷達圖等可視化佔位" />
          </Card>
        </Col>
        <Col span={10}>
          <Card title="導出">
            <p>可導出：</p>
            <ul>
              <li>Excel 報表（便於後續統計處理）</li>
              <li>PDF 報告（帶校徽與電子簽章）</li>
            </ul>
            <Space>
              <Button type="primary">導出為 Excel（UI）</Button>
              <Button>導出為 PDF（UI）</Button>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// ======================= 資助與貧困生管理 =======================
function TeacherAid() {
  const povertySummary = [
    { key: 1, level: '一般困難', count: 120, ratio: '35%' },
    { key: 2, level: '困難', count: 80, ratio: '25%' },
    { key: 3, level: '特別困難', count: 40, ratio: '12%' },
  ];

  const aidRecords = [
    {
      key: 1,
      student: '李四',
      stuNo: '20230002',
      level: '特別困難',
      project: '國家助學金',
      amount: '4000',
      date: '2025-11',
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Card title="貧困生認定概覽" style={{ marginBottom: 16 }}>
          <Table
            size="small"
            dataSource={povertySummary}
            pagination={false}
            columns={[
              { title: '等級', dataIndex: 'level' },
              { title: '人數', dataIndex: 'count', width: 100 },
              { title: '佔比', dataIndex: 'ratio', width: 100 },
            ]}
          />
        </Card>

        <Card title="認定 / 公示節點（示意）">
          <Timeline>
            <Timeline.Item>3 月上旬 · 學生提交申請</Timeline.Item>
            <Timeline.Item>3 月中旬 · 班級民主評議與輔導員初審</Timeline.Item>
            <Timeline.Item>3 月下旬 · 學院復審與公示</Timeline.Item>
          </Timeline>
        </Card>
      </Col>

      <Col span={14}>
        <Card
          title="資助發放明細"
          extra={
            <Space>
              <Select
                defaultValue="aid-all"
                style={{ width: 160 }}
                options={[
                  { value: 'aid-all', label: '全部項目' },
                  { value: 'aid-national', label: '國家助學金' },
                ]}
              />
              <DatePicker picker="year" />
            </Space>
          }
        >
          <Table
            rowKey="key"
            dataSource={aidRecords}
            columns={[
              { title: '學生姓名', dataIndex: 'student', width: 100 },
              { title: '學號', dataIndex: 'stuNo', width: 120 },
              { title: '貧困等級', dataIndex: 'level', width: 120 },
              { title: '資助項目', dataIndex: 'project' },
              { title: '金額（元）', dataIndex: 'amount', width: 120 },
              { title: '發放時間', dataIndex: 'date', width: 120 },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}

// ======================= 黨建管理 =======================
function TeacherParty() {
  const partyData = [
    {
      key: 1,
      name: '張三',
      stuNo: '20230001',
      clazz: '計科 2201',
      stage: '發展對象',
      lastReport: '2026-01-05',
    },
    {
      key: 2,
      name: '李四',
      stuNo: '20230002',
      clazz: '計科 2201',
      stage: '積極分子',
      lastReport: '2025-12-10',
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={15}>
        <Card
          title="黨員 / 積極分子名單"
          extra={
            <Input.Search
              allowClear
              placeholder="按姓名 / 學號搜索（UI）"
              style={{ width: 240 }}
            />
          }
        >
          <Table
            rowKey="key"
            dataSource={partyData}
            columns={[
              { title: '姓名', dataIndex: 'name', width: 100 },
              { title: '學號', dataIndex: 'stuNo', width: 120 },
              { title: '班級', dataIndex: 'clazz', width: 120 },
              { title: '當前階段', dataIndex: 'stage', width: 120 },
              {
                title: '最近思想匯報',
                dataIndex: 'lastReport',
                width: 160,
              },
              {
                title: '操作',
                width: 200,
                render: () => (
                  <Space>
                    <Button type="link" size="small">
                      查看培養記錄
                    </Button>
                    <Button type="link" size="small">
                      調整階段（UI）
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      </Col>
      <Col span={9}>
        <Card title="組織生活與活動">
          <Tabs
            items={[
              {
                key: 'study',
                label: '學習資料',
                children: (
                  <ul>
                    <li>關於新時代黨員標準的學習材料（示意）</li>
                    <li>黨章黨規精選學習內容（示意）</li>
                  </ul>
                ),
              },
              {
                key: 'activity',
                label: '活動安排',
                children: (
                  <Timeline>
                    <Timeline.Item>
                      3 月 20 日 · 主題黨日活動（支持掃碼簽到場景）
                    </Timeline.Item>
                    <Timeline.Item>
                      4 月 5 日 · 集中學習《黨紀學習教育》資料
                    </Timeline.Item>
                  </Timeline>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}

// ======================= 通知中心 =======================
function TeacherNotifications() {
  const notifications = [
    {
      key: 1,
      title: '綜測填報提醒',
      content: '請所有學生在 3 月 31 日前完成綜測填報。',
      time: '2026-02-28 10:00',
      target: '計科 2022 級全體學生',
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={10}>
        <Card title="發送新通知">
          <Form layout="vertical">
            <Form.Item label="通知標題">
              <Input placeholder="如：關於 2024-2025 學年綜測申報的通知" />
            </Form.Item>
            <Form.Item label="通知內容">
              <Input.TextArea
                rows={4}
                placeholder="請輸入具體說明與截止時間等"
              />
            </Form.Item>
            <Form.Item label="接收對象">
              <Select
                mode="multiple"
                placeholder="選擇範圍（UI）"
                options={[
                  { value: 'all', label: '全院學生' },
                  { value: 'cs2022', label: '計科 2022 級' },
                  { value: 'class2201', label: '計科 2201 班' },
                ]}
              />
            </Form.Item>
            <Form.Item>
              <Checkbox defaultChecked>
                同時發送站內信與微信公眾號通知（示意）
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Button type="primary" icon={<SendOutlined />}>
                發送通知（UI）
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
      <Col span={14}>
        <Card title="已發送通知">
          <Table
            rowKey="key"
            dataSource={notifications}
            columns={[
              { title: '標題', dataIndex: 'title' },
              { title: '發送時間', dataIndex: 'time', width: 180 },
              { title: '接收對象', dataIndex: 'target', width: 220 },
              {
                title: '操作',
                width: 140,
                render: () => (
                  <Space>
                    <Button type="link" size="small">
                      查看
                    </Button>
                    <Button type="link" size="small">
                      再次發送
                    </Button>
                  </Space>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}



