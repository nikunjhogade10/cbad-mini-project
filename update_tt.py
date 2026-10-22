import re

html_path = '/Users/nikunjsantoshhogade/CBAD Mini Project/student/timetable.html'
js_path = '/Users/nikunjsantoshhogade/CBAD Mini Project/assets/js/app.js'

with open(html_path, 'r') as f:
    html = f.read()

# Generate new grid HTML
new_grid = """      <!-- Timetable Grid -->
      <div class="tt-grid">
        <!-- Headers -->
        <div class="tt-cell tt-header">Time</div>
        <div class="tt-cell tt-header today"><span>Mon</span><span style="font-size:9px;font-weight:400;">(Online)</span></div>
        <div class="tt-cell tt-header"><span>Tue</span></div>
        <div class="tt-cell tt-header"><span>Wed</span><span style="font-size:9px;font-weight:400;">(Online)</span></div>
        <div class="tt-cell tt-header"><span>Thu</span></div>
        <div class="tt-cell tt-header"><span>Fri</span></div>
        <div class="tt-cell tt-header"><span>Sat</span><span style="font-size:9px;font-weight:400;">(Online)</span></div>

        <!-- 08:45-09:40 -->
        <div class="tt-cell tt-time-cell">08:45<br/>09:40</div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CBAD</div><div class="tt-class-meta">TM</div></div></div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CAPML Lab (A)</div><div class="tt-class-meta">NSN : 5417</div></div></div>
        <div class="tt-cell"><div class="tt-class-card indigo"><div class="tt-class-name">DAA</div><div class="tt-class-meta">SPC</div></div></div>
        <div class="tt-cell"><div class="tt-class-card amber"><div class="tt-class-name">SHD</div><div class="tt-class-meta">5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CBAD</div><div class="tt-class-meta">TM : 5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card current"><div class="tt-class-name">PBL-III Review</div></div></div>

        <!-- 09:40-10:35 -->
        <div class="tt-cell tt-time-cell">09:40<br/>10:35</div>
        <div class="tt-cell"><div class="tt-class-card amber"><div class="tt-class-name">PE-I (CIS/AIML)</div><div class="tt-class-meta">DUM / RAS / SKD</div></div></div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CAPML Lab (A)</div><div class="tt-class-meta">NSN : 5417</div></div></div>
        <div class="tt-cell"><div class="tt-class-card amber"><div class="tt-class-name">PE-I (CIS/AIML)</div><div class="tt-class-meta">DUM / RAS / SKD</div></div></div>
        <div class="tt-cell"><div class="tt-class-card amber"><div class="tt-class-name">SHD</div><div class="tt-class-meta">5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card indigo"><div class="tt-class-name">DAA</div><div class="tt-class-meta">SPC : 5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card current"><div class="tt-class-name">PBL-III Review</div></div></div>
        
        <!-- SHORT BREAK -->
        <div class="tt-cell tt-time-cell" style="color:var(--text-tertiary); font-size:10px;">10:35<br/>10:50</div>
        <div class="tt-cell" style="grid-column: span 6;"><div class="tt-break">Short Break</div></div>

        <!-- 10:50-11:45 -->
        <div class="tt-cell tt-time-cell">10:50<br/>11:45</div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CNEL Lab (A)</div><div class="tt-class-meta">SPS</div></div></div>
        <div class="tt-cell"><div class="tt-class-card indigo"><div class="tt-class-name">DAA</div><div class="tt-class-meta">SPC : 5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">NPTEL</div></div></div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CNEL Lab (A)</div><div class="tt-class-meta">SPS : 5613</div></div></div>
        <div class="tt-cell"><div class="tt-class-card amber"><div class="tt-class-name">PE-I (CIS/AIML)</div><div class="tt-class-meta">DUM / RAS / SKD</div></div></div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CAPML</div><div class="tt-class-meta">NSN</div></div></div>

        <!-- 11:45-12:40 -->
        <div class="tt-cell tt-time-cell">11:45<br/>12:40</div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CNEL Lab (A)</div><div class="tt-class-meta">SPS</div></div></div>
        <div class="tt-cell"><div class="tt-class-card indigo"><div class="tt-class-name">DAA</div><div class="tt-class-meta">SPC : 5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">NPTEL</div></div></div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CNEL Lab (A)</div><div class="tt-class-meta">SPS : 5613</div></div></div>
        <div class="tt-cell"><div class="tt-class-card amber"><div class="tt-class-name">PE-I (CIS/AIML)</div><div class="tt-class-meta">DUM / RAS / SKD</div></div></div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CAPML</div><div class="tt-class-meta">NSN</div></div></div>

        <!-- LUNCH BREAK -->
        <div class="tt-cell tt-time-cell" style="color:var(--text-tertiary); font-size:10px;">12:40<br/>01:40</div>
        <div class="tt-cell" style="grid-column: span 6;"><div class="tt-break">Lunch Break</div></div>

        <!-- 01:40-02:35 -->
        <div class="tt-cell tt-time-cell">01:40<br/>02:35</div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CAPML</div><div class="tt-class-meta">NSN</div></div></div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CBAD</div><div class="tt-class-meta">TM : 5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">SCIL</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">SCIL</div><div class="tt-class-meta">5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CBADL Lab (A)</div><div class="tt-class-meta">TM : 5606</div></div></div>
        <div class="tt-cell"><div class="tt-class-card current"><div class="tt-class-name">PBL-III Review</div></div></div>

        <!-- 02:35-03:30 -->
        <div class="tt-cell tt-time-cell">02:35<br/>03:30</div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CAPML</div><div class="tt-class-meta">NSN</div></div></div>
        <div class="tt-cell"><div class="tt-class-card blue"><div class="tt-class-name">CBAD</div><div class="tt-class-meta">TM : 5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">MOOC</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">SCIL</div><div class="tt-class-meta">5418</div></div></div>
        <div class="tt-cell"><div class="tt-class-card green"><div class="tt-class-name">CBADL Lab (A)</div><div class="tt-class-meta">TM : 5606</div></div></div>
        <div class="tt-cell"><div class="tt-class-card current"><div class="tt-class-name">PBL-III Review</div></div></div>

        <!-- SHORT BREAK -->
        <div class="tt-cell tt-time-cell" style="color:var(--text-tertiary); font-size:10px;">03:30<br/>03:40</div>
        <div class="tt-cell" style="grid-column: span 6;"><div class="tt-break">Short Break</div></div>

        <!-- 03:40-04:30 -->
        <div class="tt-cell tt-time-cell">03:40<br/>04:30</div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">Remedial Lecture</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">Library</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">Remedial Lecture</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">Mentor Meeting</div></div></div>
        <div class="tt-cell"><div class="tt-class-card"><div class="tt-class-name">Library</div></div></div>
        <div class="tt-cell"><div class="tt-empty"></div></div>

      </div>"""

new_html = re.sub(r'      <!-- Timetable Grid -->.*</div>\n    </main>', new_grid + '\n    </main>', html, flags=re.DOTALL)
with open(html_path, 'w') as f:
    f.write(new_html)

# Update app.js APP_DATA.subjects
with open(js_path, 'r') as f:
    js_content = f.read()

new_subjects = """  subjects: [
    { name: 'Design and Analysis of Algorithm', code: 'DAA', faculty: 'Prof. Savitri Chougule', credits: 4, ta1: 18, ta2: 17, maxMarks: 20 },
    { name: 'Container Based Application Development', code: 'CBAD', faculty: 'Prof. Tushar Mane', credits: 4, ta1: 19, ta2: 18, maxMarks: 20 },
    { name: 'Program Elective - I', code: 'PE-I', faculty: 'Prof. Deepa Mishra', credits: 3, ta1: 16, ta2: 15, maxMarks: 20 },
    { name: 'Cloud Network Engineering Lab', code: 'CNEL', faculty: 'Prof. Sushant Shirbhate', credits: 2, ta1: 17, ta2: 16, maxMarks: 20 },
    { name: 'Cloud Application Programming Models Lab', code: 'CAPML', faculty: 'Prof. Namrata Naikwade', credits: 2, ta1: 16, ta2: 17, maxMarks: 20 },
    { name: 'Container Based Application Development Lab', code: 'CBADL', faculty: 'Prof. Tushar Mane', credits: 2, ta1: 18, ta2: 17, maxMarks: 20 },
    { name: 'Aptitude & Professional Skills Core', code: 'SCIL', faculty: 'Trainer', credits: 1, ta1: 15, ta2: 16, maxMarks: 20 },
    { name: 'Foreign Language', code: 'SHD', faculty: 'Trainer', credits: 1, ta1: 18, ta2: 19, maxMarks: 20 }
  ],"""
js_content = re.sub(r'  subjects: \[.*?\],\n', new_subjects + '\n', js_content, flags=re.DOTALL, count=1)
with open(js_path, 'w') as f:
    f.write(js_content)

print("Done updating timetable and app.js")
