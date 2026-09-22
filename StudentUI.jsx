// StudentUI.jsx
// 學生端全流程 React UI（僅 UI，無實際業務邏輯）
import React, { useState } from 'react';
import {
  Layout,
  Menu,
  Avatar,
  Badge,
  Dropdown,
  Card,
  Row,
  Col,
  Tag,
  List,
  Timeline,
  Steps,
  Table,
  Button,
  Typography,
  Tabs,
  Descriptions,
  Form,
  Input,
  Upload,
  Radio,
  Checkbox,
} from 'antd';
import {
  DashboardOutlined,
  BookOutlined,
  FileDoneOutlined,
  HeartOutlined,
  TrophyOutlined,
  FlagOutlined,
  BellOutlined,
  FileTextOutlined,
  UserOutlined,
  UploadOutlined,
} from '@ant-design/icons';

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;

// ======================= 主組件：學生端 UI =======================
export default function StudentUI() {
  const [page, setPage] = useState('dashboard');

  const menuItems = [
    { key: 'dashboard', icon: <DashboardOutlined />, label: '個人首頁' },
    { key: 'study', icon: <BookOutlined />, label: '學業與競賽' },
    { key: 'comprehensive', icon: <FileDoneOutlined />, label: '綜測申報' },
    { key: 'poverty', icon: <HeartOutlined />, label: '愛心卡認證' },
    { key: 'award', icon: <TrophyOutlined />, label: '評獎評優' },
    { key: 'party', icon: <FlagOutlined />, label: '黨建成長' },
    { key: 'messages', icon: <BellOutlined />, label: '消息通知' },
    { key: 'docs', icon: <FileTextOutlined />, label: '文檔中心' },
    { key: 'profile', icon: <UserOutlined />, label: '個人中心' },
  ];

  const userMenu = {
    items: [
      { key: 'profile', label: '個人中心' },
      { type: 'divider' },
      { key: 'logout', label: '退出登入' },
    ],
  };

  const renderPage = () => {
    switch (page) {
      case 'dashboard':
        return <StudentDashboard />;
      case 'study':
        return <StudentStudy />;
      case 'comprehensive':
        return <StudentComprehensive />;
      case 'poverty':
        return <StudentPoverty />;
      case 'award':
        return <StudentAward />;
      case 'party':
        return <StudentParty />;
      case 'messages':
        return <StudentMessages />;
      case 'docs':
        return <StudentDocs />;
      case 'profile':
        return <StudentProfile />;
      default:
        return null;
    }
  };

  const pageTitleMap = {
    dashboard: '個人首頁',
    study: '學業與競賽',
    comprehensive: '綜測申報',
    poverty: '愛心卡 / 貧困生認定',
    award: '評獎評優',
    party: '黨建成長',
    messages: '消息通知',
    docs: '文檔中心',
    profile: '個人中心',
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider theme="dark" width={220}>
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
          智慧雲 · 學生端
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
            {pageTitleMap[page] || '學生端'}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <Badge count={3}>
              <BellOutlined style={{ fontSize: 18 }} />
            </Badge>
            <Dropdown menu={userMenu} placement="bottomRight">
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  cursor: 'pointer',
                  gap: 8,
                }}
              >
                <Avatar size="small">張三</Avatar>
                <span>張三 · 20230001</span>
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

// ======================= 個人首頁 =======================
function StudentDashboard() {
  const todos = [
    '完成 2024-2025 學年綜測申報（截止 3/31）',
    '補充志願服務證明 2 份',
    '提交本季度思想匯報',
  ];

  const messages = [
    { time: '今天 09:30', text: '綜測開始申報，請及時填報。' },
    { time: '昨天 17:20', text: '國家助學金申請已通過輔導員初審。' },
    { time: '本週一', text: '黨支部：請在本週內提交思想匯報。' },
  ];

  const timeline = [
    '2025-12 · 獲得校級三好學生',
    '2025-10 · ACM 省賽三等獎',
    '2025-06 · 參與 30 小時志願服務（社區支教）',
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={16}>
          <Card style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16 }}>
              <Avatar size={72} style={{ backgroundColor: '#3370ff' }}>
                張三
              </Avatar>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 18, fontWeight: 600 }}>
                  張三（20230001）
                </div>
                <div style={{ color: '#666', marginTop: 4 }}>
                  計算機科學與技術 · 計科 2201 班
                </div>
                <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
                  <Tag color="green">GPA 3.5</Tag>
                  <Tag color="gold">綜測排名 5 / 60</Tag>
                </div>
              </div>
              <div style={{ width: 260 }}>
                <div style={{ fontWeight: 600, marginBottom: 8 }}>待辦事項</div>
                <List
                  size="small"
                  dataSource={todos}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </div>
            </div>
          </Card>

          <Card title="功能入口" style={{ marginBottom: 16 }}>
            <Row gutter={[16, 16]}>
              {[
                { title: '學業與競賽', desc: '成績 / 競賽 / 等級考試' },
                { title: '綜測申報', desc: '自動核算 + 手動申報' },
                { title: '愛心卡認證', desc: '貧困生材料與進度' },
                { title: '評獎評優', desc: '可申報獎項與進度' },
                { title: '黨建成長', desc: '黨員發展進度與匯報' },
                { title: '我的報告', desc: '能力雷達圖與個人報告' },
              ].map((m) => (
                <Col span={8} key={m.title}>
                  <Card
                    hoverable
                    style={{ height: 110 }}
                    bodyStyle={{
                      padding: 12,
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ fontWeight: 600 }}>{m.title}</div>
                    <div style={{ color: '#666', fontSize: 13 }}>{m.desc}</div>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </Col>

        <Col span={8}>
          <Card title="綜合能力雷達圖（預覽）" style={{ marginBottom: 16 }}>
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
              雷達圖佔位（學業 / 競賽 / 志願 / 黨建 …）
            </div>
          </Card>

          <Card title="關鍵指標" style={{ marginBottom: 16 }}>
            <Row gutter={8}>
              <Col span={12}>
                <StatBox label="已通過綜測項" value="23" />
              </Col>
              <Col span={12}>
                <StatBox label="在讀學分" value="78" />
              </Col>
              <Col span={12}>
                <StatBox label="志願服務" value="56 小時" />
              </Col>
              <Col span={12}>
                <StatBox label="黨建積分" value="18" />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginTop: 8 }}>
        <Col span={12}>
          <Card title="最新消息通知">
            <Timeline>
              {messages.map((m, idx) => (
                <Timeline.Item key={idx}>
                  <span style={{ color: '#999', marginRight: 8 }}>{m.time}</span>
                  {m.text}
                </Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
        <Col span={12}>
          <Card title="成長動態時間線">
            <Timeline mode="left">
              {timeline.map((t, idx) => (
                <Timeline.Item key={idx}>{t}</Timeline.Item>
              ))}
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

function StatBox({ label, value }) {
  return (
    <div
      style={{
        background: '#fff',
        borderRadius: 4,
        padding: 12,
        border: '1px solid #f0f0f0',
      }}
    >
      <div style={{ color: '#999', fontSize: 12 }}>{label}</div>
      <div style={{ fontSize: 20, fontWeight: 600, marginTop: 4 }}>{value}</div>
    </div>
  );
}

// ======================= 學業與競賽 =======================
function StudentStudy() {
  const gradeColumns = [
    { title: '學期', dataIndex: 'term', width: 100 },
    { title: '課程名稱', dataIndex: 'course' },
    { title: '類別', dataIndex: 'type', width: 100 },
    { title: '學分', dataIndex: 'credit', width: 80 },
    { title: '成績', dataIndex: 'score', width: 80 },
    { title: '績點', dataIndex: 'gpa', width: 80 },
  ];

  const gradeData = [
    {
      key: 1,
      term: '2024-2025-1',
      course: '資料結構',
      type: '必修',
      credit: 4,
      score: 88,
      gpa: 3.7,
    },
  ];

  const contestColumns = [
    { title: '競賽名稱', dataIndex: 'name' },
    { title: '級別', dataIndex: 'level', width: 120 },
    { title: '獎項', dataIndex: 'award', width: 120 },
    { title: '時間', dataIndex: 'time', width: 140 },
    { title: '狀態', dataIndex: 'status', width: 100 },
  ];

  const contestData = [
    {
      key: 1,
      name: 'ACM 程式設計競賽',
      level: '省級',
      award: '三等獎',
      time: '2025-10',
      status: '已審核',
    },
  ];

  const examColumns = [
    { title: '證書類型', dataIndex: 'type', width: 140 },
    { title: '成績 / 等級', dataIndex: 'result', width: 140 },
    { title: '考試日期', dataIndex: 'date', width: 140 },
    { title: '狀態', dataIndex: 'status', width: 100 },
  ];

  const examData = [
    {
      key: 1,
      type: '英語四級',
      result: '520',
      date: '2025-06',
      status: '已審核',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="學業成績概覽" style={{ marginBottom: 16 }}>
            <Row gutter={8} style={{ marginBottom: 16 }}>
              <Col span={6}>
                <StatBox label="累計平均績點" value="3.45" />
              </Col>
              <Col span={6}>
                <StatBox label="專業排名" value="前 15%" />
              </Col>
              <Col span={6}>
                <StatBox label="已修學分" value="98" />
              </Col>
              <Col span={6}>
                <StatBox label="未通過課程" value="0 門" />
              </Col>
            </Row>
            <Table
              size="small"
              dataSource={gradeData}
              columns={gradeColumns}
              pagination={false}
            />
          </Card>

          <Card title="競賽與成果" style={{ marginBottom: 16 }}>
            <Table
              size="small"
              dataSource={contestData}
              columns={contestColumns}
              pagination={false}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="等級考試 / 證書" style={{ marginBottom: 16 }}>
            <Table
              size="small"
              dataSource={examData}
              columns={examColumns}
              pagination={false}
            />
          </Card>

          <Card title="學業趨勢（預覽）">
            <div
              style={{
                height: 200,
                background:
                  'repeating-linear-gradient(45deg, #fafafa, #fafafa 10px, #f0f0f0 10px, #f0f0f0 20px)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#999',
              }}
            >
              折線圖佔位：學期平均分 / GPA 趨勢
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// ======================= 綜測申報 =======================
function StudentComprehensive() {
  const autoItems = [
    {
      key: 1,
      category: '學業成績',
      name: '2024-2025 上學期平均分',
      detail: '平均分 86.3，專業前 10%',
      score: 60,
      status: 'approved',
    },
    {
      key: 2,
      category: '競賽',
      name: 'ACM 省賽三等獎',
      detail: '隊長，團隊三人',
      score: 5,
      status: 'approved',
    },
  ];

  const manualItems = [
    {
      key: 1,
      category: '志願服務',
      name: '社區支教 30 小時',
      score: 3,
      status: 'draft',
    },
    {
      key: 2,
      category: '學生幹部',
      name: '班級團支書工作',
      score: 4,
      status: 'pending',
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ marginBottom: 4 }}>
              2024-2025 學年 綜合測評申報
            </Title>
            <Text type="secondary">
              系統已自動計入學業成績與已審核競賽，請補充手動申報項後提交。
            </Text>
          </Col>
          <Col>
            <Tag color="orange">填報中</Tag>
          </Col>
        </Row>

        <Steps
          style={{ marginTop: 16 }}
          current={1}
          items={[
            { title: '確認自動項' },
            { title: '填寫手動申報' },
            { title: '提交並等待審核' },
          ]}
        />
      </Card>

      <Card title="一、自動計入項" style={{ marginBottom: 16 }}>
        <Table
          dataSource={autoItems}
          pagination={false}
          columns={[
            { title: '類別', dataIndex: 'category', width: 120 },
            { title: '名稱 / 課程', dataIndex: 'name' },
            { title: '說明', dataIndex: 'detail' },
            { title: '分值', dataIndex: 'score', width: 80 },
            {
              title: '狀態',
              dataIndex: 'status',
              width: 100,
              render: (val) =>
                val === 'approved' ? (
                  <Tag color="green">已計入</Tag>
                ) : (
                  <Tag>處理中</Tag>
                ),
            },
          ]}
        />
      </Card>

      <Card
        title="二、手動申報項"
        extra={<Button type="primary">新增申報（UI）</Button>}
      >
        <Table
          dataSource={manualItems}
          pagination={false}
          columns={[
            { title: '類別', dataIndex: 'category', width: 140 },
            { title: '申報名稱', dataIndex: 'name' },
            { title: '申報分值', dataIndex: 'score', width: 100 },
            {
              title: '審核狀態',
              dataIndex: 'status',
              width: 120,
              render: (val) => {
                if (val === 'draft') return <Tag>暫存</Tag>;
                if (val === 'pending') return <Tag color="orange">審核中</Tag>;
                if (val === 'approved') return <Tag color="green">通過</Tag>;
                return <Tag color="red">退回</Tag>;
              },
            },
            {
              title: '操作',
              width: 200,
              render: () => (
                <>
                  <Button type="link" size="small">
                    編輯
                  </Button>
                  <Button type="link" size="small" danger>
                    刪除
                  </Button>
                </>
              ),
            },
          ]}
        />

        <Row justify="space-between" align="middle" style={{ marginTop: 16 }}>
          <Col>
            <Text>
              當前累積綜測分：
              <Text strong style={{ color: '#3370ff' }}>
                68
              </Text>{' '}
              分
            </Text>
          </Col>
          <Col>
            <Button type="primary">提交綜測申報（UI）</Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

// ======================= 貧困生認定（愛心卡） =======================
function StudentPoverty() {
  const [tab, setTab] = useState('form');

  const historyTimeline = [
    {
      time: '2026-03-01',
      text: '提交貧困生申請',
    },
    {
      time: '2026-03-03',
      text: '輔導員已完成班級民主評議並提交初審意見',
    },
    {
      time: '2026-03-06',
      text: '學院復審中',
    },
  ];

  const formLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={4} style={{ marginBottom: 4 }}>
              愛心卡 / 貧困生認定申請
            </Title>
            <Text type="secondary">
              線上提交家庭經濟情況與相關證明材料，經班級民主評議、輔導員和學院審核後確定貧困等級。
            </Text>
          </Col>
          <Col>
            <Tag color="processing">審核中</Tag>
          </Col>
        </Row>

        <Steps
          style={{ marginTop: 16 }}
          current={1}
          items={[
            { title: '填寫申請與上傳材料' },
            { title: '班級民主評議與初審' },
            { title: '學院復審與公示' },
            { title: '確定等級與資助匹配' },
          ]}
        />
      </Card>

      <Card>
        <Tabs
          activeKey={tab}
          onChange={setTab}
          items={[
            { key: 'form', label: '申請表單', children: null },
            { key: 'history', label: '流程記錄', children: null },
          ]}
        />

        {tab === 'form' && (
          <Row gutter={24}>
            <Col span={14}>
              <Form {...formLayout} layout="horizontal">
                <Form.Item label="申請學年">
                  <Input placeholder="例如：2025-2026 學年" />
                </Form.Item>
                <Form.Item label="家庭年總收入">
                  <Input placeholder="請填寫大致年收入（元）" />
                </Form.Item>
                <Form.Item label="主要收入來源">
                  <Input placeholder="如務農、務工、經營等" />
                </Form.Item>
                <Form.Item label="家庭成員情況">
                  <Input.TextArea
                    rows={3}
                    placeholder="簡要說明家庭人口、在校生情況、重大疾病等"
                  />
                </Form.Item>
                <Form.Item label="申請貧困等級">
                  <Radio.Group defaultValue="middle">
                    <Radio value="normal">一般困難</Radio>
                    <Radio value="middle">困難</Radio>
                    <Radio value="high">特別困難</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="佐證材料上傳">
                  <Upload>
                    <Button icon={<UploadOutlined />}>
                      上傳調查表 / 收入證明 / 醫療票據等（UI）
                    </Button>
                  </Upload>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
                  <Checkbox defaultChecked>
                    我已閱讀並同意學校關於貧困生認定的相關說明
                  </Checkbox>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 18, offset: 6 }}>
                  <Button type="primary">提交申請（UI）</Button>
                  <Button style={{ marginLeft: 8 }}>暫存（UI）</Button>
                </Form.Item>
              </Form>
            </Col>
            <Col span={10}>
              <Card title="當前認定結果">
                <Descriptions column={1} size="small">
                  <Descriptions.Item label="上一學年等級">
                    困難
                  </Descriptions.Item>
                  <Descriptions.Item label="本學年申請等級">
                    特別困難
                  </Descriptions.Item>
                  <Descriptions.Item label="審核狀態">
                    <Tag color="processing">學院復審中</Tag>
                  </Descriptions.Item>
                  <Descriptions.Item label="可申請資助">
                    <ul style={{ paddingLeft: 18 }}>
                      <li>國家助學金（建議）</li>
                      <li>學校困難補助</li>
                    </ul>
                  </Descriptions.Item>
                </Descriptions>
              </Card>
            </Col>
          </Row>
        )}

        {tab === 'history' && (
          <Row gutter={24}>
            <Col span={16}>
              <Card title="流程節點">
                <Timeline>
                  {historyTimeline.map((item, idx) => (
                    <Timeline.Item key={idx}>
                      <span style={{ color: '#999', marginRight: 8 }}>
                        {item.time}
                      </span>
                      {item.text}
                    </Timeline.Item>
                  ))}
                </Timeline>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="公示信息（示意）">
                <p>2026-03-10 至 2026-03-15 為學院公示期。</p>
                <p>公示內容隱去具體收入數據等敏感信息。</p>
              </Card>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
}

// ======================= 評獎評優 =======================
function StudentAward() {
  const awardList = [
    {
      key: 1,
      name: '國家獎學金',
      level: '國家級',
      condition: '綜測排名前 10%，無不及格科目，符合相關條件',
      ddl: '2026-04-01',
      status: '可申請',
    },
    {
      key: 2,
      name: '校級三好學生',
      level: '校級',
      condition: '綜測前 20%，無記過處分',
      ddl: '2026-03-20',
      status: '已申請',
    },
  ];

  const myAwards = [
    {
      key: 1,
      name: '校級三好學生',
      year: '2024-2025',
      status: '已獲得',
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col span={16}>
          <Card title="當前可申請獎項" style={{ marginBottom: 16 }}>
            <Table
              dataSource={awardList}
              pagination={false}
              columns={[
                { title: '獎項名稱', dataIndex: 'name', width: 180 },
                { title: '級別', dataIndex: 'level', width: 100 },
                { title: '申報條件概述', dataIndex: 'condition' },
                { title: '截止日期', dataIndex: 'ddl', width: 120 },
                {
                  title: '狀態',
                  dataIndex: 'status',
                  width: 120,
                  render: (val) =>
                    val === '可申請' ? (
                      <Tag color="green">可申請</Tag>
                    ) : (
                      <Tag color="blue">已申請</Tag>
                    ),
                },
                {
                  title: '操作',
                  width: 120,
                  render: () => (
                    <Button type="link" size="small">
                      填寫申請表（UI）
                    </Button>
                  ),
                },
              ]}
            />
          </Card>

          <Card title="歷年評獎評優情況">
            <Table
              dataSource={myAwards}
              pagination={false}
              columns={[
                { title: '學年', dataIndex: 'year', width: 120 },
                { title: '獎項名稱', dataIndex: 'name' },
                {
                  title: '狀態',
                  dataIndex: 'status',
                  width: 120,
                  render: (val) => <Tag color="green">{val}</Tag>,
                },
                {
                  title: '操作',
                  width: 140,
                  render: () => (
                    <Button type="link" size="small">
                      導出榮譽證明（UI）
                    </Button>
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="我的申請進度">
            <Timeline>
              <Timeline.Item color="green">
                2025-12 · 校級三好學生 申請通過，已錄入個人檔案
              </Timeline.Item>
              <Timeline.Item color="blue">
                2026-03 · 正在填寫 國家獎學金 申請表（草稿）
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// ======================= 黨建成長 =======================
function StudentParty() {
  const stages = [
    '入黨申請人',
    '積極分子',
    '發展對象',
    '預備黨員',
    '正式黨員',
  ];

  const currentStage = 2; // 示意：處於「發展對象」

  const todos = [
    '本季度思想匯報（截至 2026-03-31）',
    '完成發展對象培訓結業測試',
  ];

  const reports = [
    {
      key: 1,
      title: '2025 Q4 思想匯報',
      time: '2026-01-05',
      status: '已批閱',
    },
  ];

  return (
    <div>
      <Card style={{ marginBottom: 16 }}>
        <Title level={4} style={{ marginBottom: 4 }}>
          黨員發展全流程
        </Title>
        <Text type="secondary">
          跟蹤從「入黨申請人」到「正式黨員」的全部階段，系統將在關鍵節點提醒提交思想匯報、材料等。
        </Text>

        <Steps
          style={{ marginTop: 16 }}
          current={currentStage}
          items={stages.map((s) => ({ title: s }))}
        />
      </Card>

      <Row gutter={16}>
        <Col span={16}>
          <Card title="當前階段任務" style={{ marginBottom: 16 }}>
            <List
              dataSource={todos}
              renderItem={(item) => <List.Item>{item}</List.Item>}
            />
            <Button type="primary" style={{ marginTop: 8 }}>
              新增思想匯報（UI）
            </Button>
          </Card>

          <Card title="思想匯報與培養記錄">
            <Table
              dataSource={reports}
              pagination={false}
              columns={[
                { title: '標題', dataIndex: 'title' },
                { title: '提交時間', dataIndex: 'time', width: 160 },
                {
                  title: '狀態',
                  dataIndex: 'status',
                  width: 120,
                  render: (val) => <Tag color="green">{val}</Tag>,
                },
                {
                  title: '操作',
                  width: 120,
                  render: () => (
                    <Button type="link" size="small">
                      查看（UI）
                    </Button>
                  ),
                },
              ]}
            />
          </Card>
        </Col>

        <Col span={8}>
          <Card title="重要節點時間線">
            <Timeline>
              <Timeline.Item>2024-10 · 提交入黨申請書</Timeline.Item>
              <Timeline.Item>2025-04 · 被確定為積極分子</Timeline.Item>
              <Timeline.Item color="blue">
                2025-12 · 被確定為發展對象
              </Timeline.Item>
              <Timeline.Item color="gray">
                預計 2026-12 · 預備黨員接收（示意）
              </Timeline.Item>
            </Timeline>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

// ======================= 消息通知 =======================
function StudentMessages() {
  const items = [
    {
      key: 1,
      type: '系統',
      title: '綜測申報開始',
      content: '2024-2025 學年綜測已開放填報，截止 3 月 31 日。',
      time: '今天 09:30',
      read: false,
    },
    {
      key: 2,
      type: '資助',
      title: '助學金發放通知',
      content: '你申請的國家助學金已通過審核，將於本月發放。',
      time: '昨天 14:20',
      read: true,
    },
  ];

  return (
    <Card>
      <Tabs
        defaultActiveKey="all"
        items={[
          { key: 'all', label: '全部', children: null },
          { key: 'unread', label: '未讀', children: null },
          { key: 'system', label: '系統通知', children: null },
        ]}
      />
      <List
        itemLayout="vertical"
        dataSource={items}
        renderItem={(item) => (
          <List.Item key={item.key}>
            <List.Item.Meta
              title={
                <span>
                  {!item.read && (
                    <span
                      style={{
                        display: 'inline-block',
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: '#f5222d',
                        marginRight: 8,
                      }}
                    />
                  )}
                  {item.title}{' '}
                  <Tag size="small" style={{ marginLeft: 8 }}>
                    {item.type}
                  </Tag>
                </span>
              }
              description={
                <span style={{ color: '#999', fontSize: 12 }}>{item.time}</span>
              }
            />
            <div>{item.content}</div>
          </List.Item>
        )}
      />
    </Card>
  );
}

// ======================= 文檔中心 =======================
function StudentDocs() {
  const templates = [
    {
      key: 1,
      name: '貧困生認定申請表（模板）',
      type: 'PDF',
    },
    {
      key: 2,
      name: '國家獎學金申請書（模板）',
      type: 'DOCX',
    },
  ];

  const myMaterials = [
    {
      key: 1,
      name: '2025-10 ACM 省賽獲獎證書',
      type: '圖片',
    },
  ];

  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="申請模板 / 政策文件" style={{ marginBottom: 16 }}>
          <Table
            dataSource={templates}
            pagination={false}
            columns={[
              { title: '名稱', dataIndex: 'name' },
              { title: '格式', dataIndex: 'type', width: 100 },
              {
                title: '操作',
                width: 140,
                render: () => (
                  <Button type="link" size="small">
                    下載（UI）
                  </Button>
                ),
              },
            ]}
          />
        </Card>
      </Col>
      <Col span={12}>
        <Card
          title="我的個人材料庫"
          extra={
            <Button type="primary" size="small">
              上傳新材料（UI）
            </Button>
          }
        >
          <Table
            dataSource={myMaterials}
            pagination={false}
            columns={[
              { title: '名稱', dataIndex: 'name' },
              { title: '類型', dataIndex: 'type', width: 120 },
              {
                title: '操作',
                width: 200,
                render: () => (
                  <>
                    <Button type="link" size="small">
                      查看
                    </Button>
                    <Button type="link" size="small">
                      插入到申請表（UI）
                    </Button>
                  </>
                ),
              },
            ]}
          />
        </Card>
      </Col>
    </Row>
  );
}

// ======================= 個人中心 =======================
function StudentProfile() {
  return (
    <Row gutter={16}>
      <Col span={12}>
        <Card title="基本信息">
          <Descriptions column={1} size="small">
            <Descriptions.Item label="姓名">張三</Descriptions.Item>
            <Descriptions.Item label="學號">20230001</Descriptions.Item>
            <Descriptions.Item label="學院">計算機學院</Descriptions.Item>
            <Descriptions.Item label="專業">
              計算機科學與技術
            </Descriptions.Item>
            <Descriptions.Item label="班級">
              計科 2201 班
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={12}>
        <Card title="帳號安全">
          <List>
            <List.Item
              actions={[<Button type="link">修改密碼（UI）</Button>]}
            >
              <List.Item.Meta
                title="登入密碼"
                description="定期修改密碼，保證帳號安全。"
              />
            </List.Item>
            <List.Item
              actions={[<Button type="link">管理設備（UI）</Button>]}
            >
              <List.Item.Meta
                title="登入設備管理"
                description="查看最近登入設備與地點。"
              />
            </List.Item>
          </List>
        </Card>
      </Col>
    </Row>
  );
}



