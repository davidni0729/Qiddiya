CREATE TABLE IF NOT EXISTS registrations (
  id TEXT PRIMARY KEY,
  reference_code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL COLLATE NOCASE UNIQUE,
  phone TEXT,
  instagram TEXT,
  city TEXT,
  interests TEXT NOT NULL DEFAULT '[]',
  source TEXT NOT NULL,
  invite_code TEXT,
  audience_type TEXT NOT NULL DEFAULT 'general',
  privacy_consent INTEGER NOT NULL DEFAULT 0,
  marketing_consent INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'registered',
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS invite_codes (
  code TEXT PRIMARY KEY COLLATE NOCASE,
  source_name TEXT NOT NULL,
  audience_type TEXT NOT NULL DEFAULT 'general',
  quota INTEGER NOT NULL DEFAULT 0,
  used_count INTEGER NOT NULL DEFAULT 0,
  is_active INTEGER NOT NULL DEFAULT 1,
  expires_at TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS idx_registrations_created_at ON registrations(created_at DESC);
--> statement-breakpoint
INSERT OR IGNORE INTO invite_codes
  (code, source_name, audience_type, quota, used_count, is_active)
VALUES
  ('FIRSTSIGNAL', 'TianYen Private Signal', 'priority', 50, 0, 1);
