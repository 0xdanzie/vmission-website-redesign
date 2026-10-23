/**
 * Safe, Idempotent Seed Script for Publications, Courses, Events, and Acharyas
 *
 * Imports canonical records from:
 *   - src/data/acharyas.ts     -> public.acharyas (4 records)
 *   - src/data/courses.ts      -> public.courses (4 records)
 *   - src/data/events.ts       -> public.events (44 records)
 *   - src/data/publications.ts -> public.publications (250 records)
 *
 * Safety & Security:
 * - Uses Node.js native fetch (zero extra dependencies).
 * - Validates schema constraints, types, primary keys, and slugs.
 * - Idempotent: checks existing IDs in Supabase and skips them without overwriting.
 * - Marks existing public records as is_published: true.
 * - Supports --dry-run mode to validate all datasets without writing to the database.
 * - Never logs secret keys or credentials.
 *
 * Usage:
 *   node scripts/seed-batch2.js --dry-run
 *   node scripts/seed-batch2.js
 */

const path = require('path');

function buildAuthHeaders(key) {
  const headers = {
    apikey: key,
  };
  if (typeof key === 'string' && key.split('.').length === 3) {
    headers['Authorization'] = `Bearer ${key}`;
  }
  return headers;
}

// -----------------------------------------------------------------------------
// Validators & Mappers
// -----------------------------------------------------------------------------

function validateAcharyas(records) {
  const errors = [];
  const slugs = new Set();
  const mapped = [];

  records.forEach((a, idx) => {
    const label = `Acharya [${a.slug || idx}]`;
    if (!a.slug || typeof a.slug !== 'string' || !a.slug.trim()) {
      errors.push(`${label}: Missing or invalid slug`);
    } else if (slugs.has(a.slug)) {
      errors.push(`${label}: Duplicate slug "${a.slug}"`);
    } else {
      slugs.add(a.slug);
    }

    if (!a.name || typeof a.name !== 'string') errors.push(`${label}: Missing name`);
    if (!a.role || typeof a.role !== 'string') errors.push(`${label}: Missing role`);
    if (!a.shortBio || typeof a.shortBio !== 'string') errors.push(`${label}: Missing shortBio`);
    if (!a.fullBio || typeof a.fullBio !== 'string') errors.push(`${label}: Missing fullBio`);
    if (!a.lineage || typeof a.lineage !== 'string') errors.push(`${label}: Missing lineage`);
    if (!a.image || typeof a.image !== 'string') errors.push(`${label}: Missing image`);

    mapped.push({
      slug: a.slug,
      name: a.name,
      honorific: a.honorific || '',
      role: a.role,
      short_bio: a.shortBio,
      full_bio: a.fullBio,
      lineage: a.lineage,
      image: a.image,
      teachings: Array.isArray(a.teachings) ? a.teachings : [],
      related_audio: Array.isArray(a.relatedAudio) ? a.relatedAudio : [],
      programs: Array.isArray(a.programs) ? a.programs : [],
      is_founder: !!a.isFounder,
      milestones: Array.isArray(a.milestones) ? a.milestones : [],
      verification_state: a.verificationState || 'SUMMARY-VERIFIED',
      archival_notice: a.archivalNotice || null,
      sort_order: idx,
      is_published: true,
    });
  });

  return { errors, mapped };
}

function validateCourses(records) {
  const errors = [];
  const ids = new Set();
  const slugs = new Set();
  const mapped = [];
  const ALLOWED_FORMATS = new Set(['Online', 'Residential', 'Camp', 'Study Group']);
  const ALLOWED_STATUS = new Set(['AVAILABLE', 'ADMISSION_BASED', 'PARTIAL_DIGITIZING', 'STUDY_CIRCLE']);

  records.forEach((c, idx) => {
    const label = `Course [${c.id || idx}]`;
    if (!c.id || typeof c.id !== 'string') {
      errors.push(`${label}: Missing or invalid id`);
    } else if (ids.has(c.id)) {
      errors.push(`${label}: Duplicate id "${c.id}"`);
    } else {
      ids.add(c.id);
    }

    if (!c.slug || typeof c.slug !== 'string') {
      errors.push(`${label}: Missing or invalid slug`);
    } else if (slugs.has(c.slug)) {
      errors.push(`${label}: Duplicate slug "${c.slug}"`);
    } else {
      slugs.add(c.slug);
    }

    if (!ALLOWED_FORMATS.has(c.format)) {
      errors.push(`${label}: Invalid format "${c.format}"`);
    }
    if (c.status && !ALLOWED_STATUS.has(c.status)) {
      errors.push(`${label}: Invalid status "${c.status}"`);
    }
    if (!c.title) errors.push(`${label}: Missing title`);
    if (!c.teacher) errors.push(`${label}: Missing teacher`);
    if (!c.description) errors.push(`${label}: Missing description`);

    mapped.push({
      id: c.id,
      slug: c.slug,
      canonical_id: c.canonicalId || null,
      title: c.title,
      subtitle: c.subtitle || '',
      format: c.format,
      status: c.status || 'AVAILABLE',
      teacher: c.teacher,
      duration: c.duration || '',
      fee: c.fee || '',
      eligibility: c.eligibility || '',
      description: c.description,
      what_you_learn: Array.isArray(c.whatYouLearn) ? c.whatYouLearn : [],
      structure: c.structure || '',
      dress_code: c.dressCode || null,
      sample_lessons: Array.isArray(c.sampleLessons) ? c.sampleLessons : [],
      questionnaire: Array.isArray(c.questionnaire) ? c.questionnaire : [],
      sort_order: idx,
      is_published: true,
    });
  });

  return { errors, mapped };
}

function validateEvents(records) {
  const errors = [];
  const ids = new Set();
  const mapped = [];
  const ALLOWED_TYPES = new Set(['Satsang', 'Gyana Yagna', 'Camp', 'Celebration', 'Course', 'Workshop']);
  const ALLOWED_REG = new Set(['open', 'closed', 'limited']);

  records.forEach((e, idx) => {
    const label = `Event [${e.id || idx}]`;
    if (!e.id || typeof e.id !== 'string') {
      errors.push(`${label}: Missing or invalid id`);
    } else if (ids.has(e.id)) {
      errors.push(`${label}: Duplicate id "${e.id}"`);
    } else {
      ids.add(e.id);
    }

    if (!ALLOWED_TYPES.has(e.type)) {
      errors.push(`${label}: Invalid type "${e.type}"`);
    }
    if (!ALLOWED_REG.has(e.registration)) {
      errors.push(`${label}: Invalid registration "${e.registration}"`);
    }
    if (!e.title) errors.push(`${label}: Missing title`);
    if (!e.teacher) errors.push(`${label}: Missing teacher`);
    if (!e.startDate) errors.push(`${label}: Missing startDate`);
    if (!e.endDate) errors.push(`${label}: Missing endDate`);
    if (!e.description) errors.push(`${label}: Missing description`);

    mapped.push({
      id: e.id,
      canonical_id: e.canonicalId || null,
      title: e.title,
      type: e.type,
      entity_type: e.entityType || null,
      teacher: e.teacher,
      location: e.location || '',
      city: e.city || '',
      start_date: e.startDate,
      end_date: e.endDate,
      description: e.description,
      schedule: Array.isArray(e.schedule) ? e.schedule : [],
      registration: e.registration,
      fee: e.fee || null,
      is_past: !!e.isPast,
      is_archival: !!e.isArchival,
      source_url: e.sourceUrl || null,
      is_published: true,
    });
  });

  return { errors, mapped };
}

function validatePublications(records) {
  const errors = [];
  const ids = new Set();
  const mapped = [];
  const ALLOWED_TYPES = new Set(['Vedanta Sandesh', 'Vedanta Piyush', 'E-Books', 'Study & Chant Texts']);

  records.forEach((p, idx) => {
    const label = `Publication [${p.id || idx}]`;
    if (!p.id || typeof p.id !== 'string') {
      errors.push(`${label}: Missing or invalid id`);
    } else if (ids.has(p.id)) {
      errors.push(`${label}: Duplicate id "${p.id}"`);
    } else {
      ids.add(p.id);
    }

    if (!ALLOWED_TYPES.has(p.type)) {
      errors.push(`${label}: Invalid type "${p.type}"`);
    }
    if (!p.title) errors.push(`${label}: Missing title`);

    mapped.push({
      id: p.id,
      canonical_id: p.canonicalId || null,
      type: p.type,
      title: p.title,
      month: p.month || null,
      year: typeof p.year === 'number' ? p.year : null,
      cover_image: p.coverImage || null,
      language: p.language || 'English',
      download_url: p.downloadUrl || '#',
      archive_url: p.archiveUrl || null,
      read_online_url: p.readOnlineUrl || null,
      mirrors: p.mirrors || {},
      description: p.description || null,
      is_latest: !!p.isLatest,
      page_count: typeof p.pageCount === 'number' ? p.pageCount : null,
      author: p.author || null,
      local_cover: p.localCover || null,
      source_cover_url: p.sourceCoverUrl || null,
      canonical_source: p.canonicalSource || null,
      alternate_sources: Array.isArray(p.alternateSources) ? p.alternateSources : [],
      is_published: true,
    });
  });

  return { errors, mapped };
}

// -----------------------------------------------------------------------------
// Main Runner
// -----------------------------------------------------------------------------
async function run() {
  const isDryRun = process.argv.includes('--dry-run');

  console.log('===============================================================');
  console.log(`Vmission Ashram Batch 2 Seed Process ${isDryRun ? '[DRY RUN]' : '[LIVE]'}`);
  console.log('===============================================================\n');

  // Load source datasets
  const acharyasData = require(path.resolve(__dirname, '../src/data/acharyas.ts'));
  const coursesData = require(path.resolve(__dirname, '../src/data/courses.ts'));
  const eventsData = require(path.resolve(__dirname, '../src/data/events.ts'));
  const publicationsData = require(path.resolve(__dirname, '../src/data/publications.ts'));

  const acharyas = acharyasData.acharyas || [];
  const courses = coursesData.courses || [];
  const events = eventsData.events || [];
  const publications = publicationsData.PUBLICATIONS || publicationsData.publications || [];

  console.log(`Loaded source records:`);
  console.log(`  - Acharyas:    ${acharyas.length}`);
  console.log(`  - Courses:     ${courses.length}`);
  console.log(`  - Events:      ${events.length}`);
  console.log(`  - Publications:${publications.length}\n`);

  // Validate all datasets
  const vAcharyas = validateAcharyas(acharyas);
  const vCourses = validateCourses(courses);
  const vEvents = validateEvents(events);
  const vPublications = validatePublications(publications);

  const totalErrors = [
    ...vAcharyas.errors,
    ...vCourses.errors,
    ...vEvents.errors,
    ...vPublications.errors,
  ];

  if (totalErrors.length > 0) {
    console.error(`Validation failed with ${totalErrors.length} errors:`);
    totalErrors.slice(0, 15).forEach((e) => console.error(`  ✕ ${e}`));
    if (totalErrors.length > 15) {
      console.error(`  ... and ${totalErrors.length - 15} more.`);
    }
    process.exit(1);
  }

  console.log('✔ All 4 datasets passed schema & constraint validation with ZERO errors!\n');

  if (isDryRun) {
    console.log('---------------------------------------------------------------');
    console.log('DRY RUN SUMMARY:');
    console.log(`  - Acharyas:     ${vAcharyas.mapped.length} records ready to import`);
    console.log(`  - Courses:      ${vCourses.mapped.length} records ready to import`);
    console.log(`  - Events:       ${vEvents.mapped.length} records ready to import`);
    console.log(`  - Publications: ${vPublications.mapped.length} records ready to import`);
    console.log('All records set to is_published: true.');
    console.log('No database writes were performed.');
    console.log('---------------------------------------------------------------');
    return;
  }

  // Live seed requires explicit environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    console.error('Missing required environment variables for live import:');
    console.error('  NEXT_PUBLIC_SUPABASE_URL');
    console.error('  SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY)');
    process.exit(1);
  }

  const headers = {
    ...buildAuthHeaders(secretKey),
    'Content-Type': 'application/json',
    Prefer: 'resolution=ignore-duplicates,return=representation',
  };

  // Helper to seed a table in batches
  async function seedTable(tableName, idCol, records, batchSize = 50) {
    console.log(`\nImporting to public.${tableName}...`);
    // 1. Query existing IDs
    const checkRes = await fetch(`${supabaseUrl}/rest/v1/${tableName}?select=${idCol}`, {
      headers: buildAuthHeaders(secretKey),
    });

    if (!checkRes.ok) {
      const errText = await checkRes.text();
      throw new Error(`Failed to check existing records in ${tableName}: ${checkRes.status} ${errText}`);
    }

    const existingRows = await checkRes.json();
    const existingIds = new Set(existingRows.map((r) => r[idCol]));
    const toInsert = records.filter((r) => !existingIds.has(r[idCol]));

    console.log(`  Found ${existingIds.size} existing records in public.${tableName}.`);
    console.log(`  ${toInsert.length} new records will be inserted (${records.length - toInsert.length} skipped).`);

    if (toInsert.length === 0) {
      console.log(`  ✔ public.${tableName} is already up to date.`);
      return;
    }

    // Insert in batches
    for (let i = 0; i < toInsert.length; i += batchSize) {
      const batch = toInsert.slice(i, i + batchSize);
      const insertRes = await fetch(`${supabaseUrl}/rest/v1/${tableName}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(batch),
      });

      if (!insertRes.ok) {
        const errText = await insertRes.text();
        throw new Error(`Batch insert failed on ${tableName} (offset ${i}): ${insertRes.status} ${errText}`);
      }
      console.log(`  Inserted batch ${i + 1} to ${Math.min(i + batchSize, toInsert.length)} / ${toInsert.length}`);
    }

    console.log(`  ✔ Successfully imported ${toInsert.length} records into public.${tableName}.`);
  }

  try {
    await seedTable('acharyas', 'slug', vAcharyas.mapped);
    await seedTable('courses', 'id', vCourses.mapped);
    await seedTable('events', 'id', vEvents.mapped);
    await seedTable('publications', 'id', vPublications.mapped);
    console.log('\n===============================================================');
    console.log('All Batch 2 datasets successfully imported to Supabase!');
    console.log('===============================================================');
  } catch (err) {
    console.error('\nSeed failed:', err.message);
    process.exit(1);
  }
}

run().catch((err) => {
  console.error('Fatal error during seed execution:', err);
  process.exit(1);
});
