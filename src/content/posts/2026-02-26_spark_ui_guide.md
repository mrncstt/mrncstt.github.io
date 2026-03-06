---
title: "How I (or try to) read the Spark UI"
date: 2026-02-26
slug: spark-ui-guide
tags: [spark ui, databricks, debugging, data engineering]
description: "Part 1 of x. Coming soon"
listed: false
---

<style>
.spark-tag{display:inline-block;padding:.12rem .45rem;background:var(--surface,#181b25);border:1px solid var(--border,#2a2e3d);border-radius:12px;font-size:.65rem;color:var(--text-muted,#9ba3b5);margin-right:.3rem}
.subtitle{font-size:.9rem;color:var(--text-muted,#9ba3b5);margin-bottom:1.5rem}
.spark-panel{max-width:780px;margin:0 0 .5rem;border-radius:6px;overflow:hidden;border:1px solid #ddd !important;background:#fff !important;font-family:-apple-system,'Helvetica Neue',Arial,sans-serif;color:#333 !important}
.spark-panel *{background-color:#fff !important;color:#333 !important}
.spark-panel .sp-tabs{display:flex;gap:0;font-size:13px;border-bottom:2px solid #ddd !important;padding:0}
.spark-panel .sp-tab{padding:8px 12px;color:#555 !important}
.spark-panel .sp-tab-active{padding:8px 12px;color:#1a0dab !important;border-bottom:3px solid #1a0dab !important;font-weight:600;margin-bottom:-2px}
.spark-panel .sp-info{font-size:12px;color:#666 !important;line-height:1.8}
.spark-panel .sp-info *{color:#666 !important}
.spark-panel .sp-title{font-weight:700;font-size:16px;margin-bottom:6px;color:#000 !important}
</style>

## Opening the Spark UI

<div style="display:flex;max-width:780px;margin:0 0 .5rem;border-radius:6px;overflow:hidden;border:1px solid #23273a;background:#1b1e2e;font-family:-apple-system,'Helvetica Neue',Arial,sans-serif">
  <div style="flex:1;border-right:1px solid #23273a;min-width:0">
    <div style="padding:10px 16px;border-bottom:1px solid #23273a;display:flex;align-items:center;gap:8px">
      <span style="color:#e0e4ed !important;font-size:15px;font-weight:600">etl_daily_pipeline</span>
      <span style="font-size:11px;color:#5cb85c !important;background:#1a2e1a;border:1px solid #2a4a2a;padding:2px 8px;border-radius:10px">Run #42 - Succeeded</span>
    </div>
    <div style="padding:8px 16px;font-size:13px;font-weight:600;color:#e0e4ed !important;border-bottom:1px solid #23273a">Output</div>
    <div style="padding:10px 16px;font-family:monospace;font-size:10px;color:#9ba3b5 !important;background:#141723;min-height:120px;line-height:1.6">
      <span style="color:#6b7280 !important">[2026-02-26 18:03:12]</span> Reading delta table...<br>
      <span style="color:#6b7280 !important">[2026-02-26 18:03:14]</span> Filter: status='completed'<br>
      <span style="color:#6b7280 !important">[2026-02-26 18:15:28]</span> Broadcast join completed<br>
      <span style="color:#6b7280 !important">[2026-02-26 18:37:41]</span> GroupBy aggregation done<br>
      <span style="color:#5cb85c !important">[2026-02-26 18:41:33]</span> <span style="color:#5cb85c !important">Pipeline completed. Rows: 2,847</span>
    </div>
  </div>
  <div style="width:240px;flex-shrink:0;background:#1b1e2e">
    <div style="padding:10px 14px;font-size:13px;font-weight:600;color:#e0e4ed !important;border-bottom:1px solid #23273a">Task run</div>
    <div style="padding:8px 14px;font-size:11px;line-height:2;color:#e0e4ed !important">
      <div><span style="color:#6b7280 !important">Job ID</span><br><span style="color:#7eb8ff !important">913847562</span></div>
      <div><span style="color:#6b7280 !important">Job run ID</span><br><span style="color:#7eb8ff !important">42</span></div>
      <div><span style="color:#6b7280 !important">Started</span><br>02/26/2026, 6:03:12 PM</div>
      <div><span style="color:#6b7280 !important">Duration</span><br>38.4 min</div>
      <div><span style="color:#6b7280 !important">Status</span><br><span style="color:#5cb85c !important;font-weight:600">Succeeded</span></div>
      <div style="border-top:1px solid #23273a;margin-top:6px;padding-top:6px">
        <span style="color:#6b7280 !important">Cluster</span><br>
        <span style="color:#7eb8ff !important;text-decoration:underline;cursor:pointer">etl-production-cluster</span>
        <span style="display:block;font-size:10px;color:#5c6278 !important;margin-top:1px">i3.xlarge - 2 workers</span>
      </div>
      <div style="border-top:1px solid #23273a;margin-top:8px;padding-top:8px;display:flex;flex-wrap:wrap;gap:6px 12px;font-size:11px">
        <span style="color:#7eb8ff !important;cursor:pointer">View details <span style="display:inline-block;width:8px;height:8px;border-right:1.5px solid #7eb8ff;border-top:1.5px solid #7eb8ff;transform:rotate(-45deg) translate(-1px,1px)"></span></span>
        <span style="color:#7eb8ff !important;cursor:pointer">Spark UI <span style="display:inline-block;width:8px;height:8px;border-right:1.5px solid #7eb8ff;border-top:1.5px solid #7eb8ff;transform:rotate(-45deg) translate(-1px,1px)"></span></span>
        <span style="color:#7eb8ff !important;cursor:pointer">Logs <span style="display:inline-block;width:8px;height:8px;border-right:1.5px solid #7eb8ff;border-top:1.5px solid #7eb8ff;transform:rotate(-45deg) translate(-1px,1px)"></span></span>
        <span style="color:#7eb8ff !important;cursor:pointer">Metrics <span style="display:inline-block;width:8px;height:8px;border-right:1.5px solid #7eb8ff;border-top:1.5px solid #7eb8ff;transform:rotate(-45deg) translate(-1px,1px)"></span></span>
      </div>
    </div>
  </div>
</div>

Click the cluster name link in the right panel. That opens the cluster page, where you click the **Spark UI** tab:

<div class="spark-panel"><div class="sp-tabs"><span class="sp-tab-active">Jobs</span><span class="sp-tab">Stages</span><span class="sp-tab">Storage</span><span class="sp-tab">Environment</span><span class="sp-tab">Executors</span><span class="sp-tab">SQL / DataFrame</span></div><div style="padding:14px 18px"><div class="sp-title">Spark Jobs</div><div class="sp-info"><div>User: root</div><div>Total Uptime: 38.4 min</div><div>Scheduling Mode: FAIR</div><div>Completed Jobs</div><div>Failed Jobs</div></div></div></div>
