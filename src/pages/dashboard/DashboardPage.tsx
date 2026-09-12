import { useEffect, useState } from 'react';
import { Card, Col, List, Row, Skeleton, Statistic, Typography } from 'antd';
import { getDashboardOverview } from '@/api/modules/dashboard.api';
import type { DashboardData } from '@/types';

const SKELETON_KEYS = ['a', 'b', 'c', 'd'];

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData>();

  useEffect(() => {
    let active = true;
    void getDashboardOverview().then((overview) => {
      if (active) setData(overview);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <Typography.Title level={2}>Dashboard</Typography.Title>
      <Typography.Paragraph type="secondary">
        A local-only administration starter. Replace the mock module when connecting your API.
      </Typography.Paragraph>

      <Row gutter={[16, 16]}>
        {data
          ? data.metrics.map((metric) => (
              <Col xs={24} sm={12} lg={6} key={metric.label}>
                <Card>
                  <Statistic title={metric.label} value={metric.value} suffix={metric.suffix} />
                </Card>
              </Col>
            ))
          : SKELETON_KEYS.map((key) => (
              <Col xs={24} sm={12} lg={6} key={key}>
                <Card>
                  <Skeleton active />
                </Card>
              </Col>
            ))}
      </Row>

      <Card title="Recent activity" className="section-card">
        <List
          dataSource={data?.activities}
          loading={!data}
          renderItem={(item) => (
            <List.Item>
              <List.Item.Meta title={item.title} description={item.detail} />
              <Typography.Text type="secondary">{item.time}</Typography.Text>
            </List.Item>
          )}
        />
      </Card>
    </>
  );
}
