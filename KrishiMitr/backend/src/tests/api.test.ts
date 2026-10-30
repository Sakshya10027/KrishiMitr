import { describe, it, expect, beforeAll } from 'vitest';
import request from 'supertest';
import { createApp } from '../app.js';
import { Express } from 'express';

describe('KrishiMitr REST API Integration Suite', () => {
  let app: Express;

  beforeAll(() => {
    app = createApp();
  });

  it('GET /api/v1/health returns HTTP 200 with service UP', async () => {
    const res = await request(app).get('/api/v1/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('UP');
    expect(res.body.service).toContain('KrishiMitr');
  });

  it('GET /api/v1/nutrient-maps/parameters returns standard 7 parameter thresholds', async () => {
    const res = await request(app).get('/api/v1/nutrient-maps/parameters');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(Array.isArray(res.body.data)).toBe(true);
    expect(res.body.data.length).toBe(7);
  });

  it('POST /api/v1/fertilizer/recommendations returns validated calculation', async () => {
    const res = await request(app)
      .post('/api/v1/fertilizer/recommendations')
      .send({
        crop: 'wheat',
        area: { value: 1.5, unit: 'hectare' },
        soilTest: {
          nitrogen: 210,
          phosphorus: 16.5,
          potassium: 295,
          organicCarbon: 0.42,
          ph: 7.4
        }
      });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.crop).toBe('wheat');
    expect(res.body.data.fertilizerProducts).toBeDefined();
  });

  it('POST /api/v1/fertilizer/recommendations rejects invalid area values', async () => {
    const res = await request(app)
      .post('/api/v1/fertilizer/recommendations')
      .send({
        crop: 'wheat',
        area: { value: -1, unit: 'hectare' },
        soilTest: { nitrogen: 200, phosphorus: 15, potassium: 200 }
      });

    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('VALIDATION_ERROR');
  });

  it('GET /api/v1/analytics/overview returns national progress cycles', async () => {
    const res = await request(app).get('/api/v1/analytics/overview');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.cycles.cycle1).toBeDefined();
    expect(res.body.data.cycles.cycle2).toBeDefined();
  });

  it('GET /api/v1/analytics/exports/csv returns text/csv with safe headers', async () => {
    const res = await request(app).get('/api/v1/analytics/exports/csv?cycle=cycle2');
    expect(res.status).toBe(200);
    expect(res.headers['content-type']).toContain('text/csv');
    expect(res.text).toContain('State / UT Name');
  });

  it('Returns HTTP 404 with standard envelope for unknown route', async () => {
    const res = await request(app).get('/api/v1/non-existent-route-xyz');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
    expect(res.body.error.code).toBe('ROUTE_NOT_FOUND');
  });
});
