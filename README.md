# job-dashboard

日本设计岗位匹配 · **累积存档**（每日 08:28 由 Cowork 定时任务自动合并去重并推送）。页面已设 noindex，不被搜索引擎收录。

- **index.html** — 累积存档应用（加载 data.json，分页/搜索/筛选/排序）。GitHub Pages 首页。
- **data.json** — 累积数据（按 公司+职位 去重，含 firstSeen/lastSeen/seenCount）。
- **today.html** — 当天匹配的静态快照（无需 JS）。
- **build.js** — 每日合并脚本。
