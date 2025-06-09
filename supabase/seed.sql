-- Insert sample jobs
INSERT INTO jobs (title, company_name, location, salary_range, job_type, description, requirements, benefits)
VALUES
    (
        'Senior Frontend Developer',
        'TechCorp Indonesia',
        'Jakarta Selatan',
        'Rp 25.000.000 - Rp 35.000.000',
        'Full-time',
        'Kami mencari seorang Senior Frontend Developer yang berpengalaman untuk bergabung dengan tim pengembangan kami. Anda akan bertanggung jawab untuk mengembangkan dan memelihara aplikasi web modern menggunakan React dan Next.js.',
        ARRAY[
            'Minimal 5 tahun pengalaman dalam pengembangan frontend',
            'Mahir dalam React, Next.js, dan TypeScript',
            'Pengalaman dengan state management (Redux/Context)',
            'Memahami prinsip-prinsip UI/UX'
        ],
        ARRAY[
            'Asuransi kesehatan',
            'Tunjangan transportasi',
            'Work from home 2x seminggu',
            'Tunjangan pengembangan karir'
        ]
    ),
    (
        'Backend Developer',
        'Digital Solutions',
        'Bandung',
        'Rp 20.000.000 - Rp 30.000.000',
        'Full-time',
        'Kami mencari Backend Developer yang berpengalaman untuk mengembangkan dan memelihara API dan layanan backend kami. Anda akan bekerja dengan Node.js, PostgreSQL, dan berbagai teknologi cloud.',
        ARRAY[
            'Minimal 3 tahun pengalaman dalam pengembangan backend',
            'Mahir dalam Node.js dan PostgreSQL',
            'Pengalaman dengan RESTful API dan GraphQL',
            'Memahami konsep microservices'
        ],
        ARRAY[
            'Asuransi kesehatan',
            'Tunjangan makan',
            'Fleksibel work hours',
            'Tunjangan pendidikan'
        ]
    ),
    (
        'UI/UX Designer',
        'Creative Studio',
        'Surabaya',
        'Rp 15.000.000 - Rp 25.000.000',
        'Full-time',
        'Kami mencari UI/UX Designer yang kreatif dan berpengalaman untuk merancang antarmuka pengguna yang menarik dan fungsional. Anda akan bekerja sama dengan tim pengembangan untuk menciptakan pengalaman pengguna yang luar biasa.',
        ARRAY[
            'Minimal 3 tahun pengalaman dalam UI/UX design',
            'Mahir dalam Figma dan Adobe Creative Suite',
            'Portfolio yang kuat',
            'Memahami prinsip-prinsip UX'
        ],
        ARRAY[
            'Asuransi kesehatan',
            'Tunjangan transportasi',
            'Remote work options',
            'Tunjangan peralatan kerja'
        ]
    ); 