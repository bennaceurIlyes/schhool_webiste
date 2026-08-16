/**
 * Security & Validation Utilities for Académie Al-Khwarizmi Web Application
 * Handles XSS sanitization, length limiting, pattern verification, and Arabic normalization.
 */

// Strip HTML tags, script injection patterns, and control characters
export function sanitizeInput(value, maxLength = 100) {
  if (typeof value !== 'string') return ''
  
  // 1. Remove dangerous script/html tags and html entities
  let clean = value
    .replace(/<[^>]*>/g, '') // remove HTML tags
    .replace(/[<>'"&`\\]/g, (char) => {
      // Escape critical characters if any remain
      const map = {
        '<': '&lt;',
        '>': '&gt;',
        "'": '&#39;',
        '"': '&quot;',
        '&': '&amp;',
        '`': '&#96;',
        '\\': '&#92;',
      }
      return map[char] || ''
    })
    // 2. Remove non-printable / control characters (except standard newlines/tabs)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    // 3. Trim extra whitespace
    .trim()

  // 4. Enforce max length constraint
  if (maxLength > 0 && clean.length > maxLength) {
    clean = clean.slice(0, maxLength)
  }

  return clean
}

// Validate phone number format (supports Algerian format 05/06/07/02 and international formats)
export function isValidPhone(phone) {
  if (!phone || typeof phone !== 'string') return false
  const cleanPhone = phone.replace(/[\s\-\.\(\)]/g, '')
  // Allows Algerian mobile/landline numbers (e.g. 0555123456, +213555123456) or international 8-15 digits
  const algerianPattern = /^(?:(?:\+|00)213|0)[24-7][0-9]{8}$/
  const generalPattern = /^\+?[0-9]{8,15}$/
  return algerianPattern.test(cleanPhone) || generalPattern.test(cleanPhone)
}

// Validate email format
export function isValidEmail(email) {
  if (!email || typeof email !== 'string') return true // optional
  const cleanEmail = email.trim()
  if (cleanEmail === '') return true
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(cleanEmail) && cleanEmail.length <= 100
}

// Validate human name (Arabic / Latin letters, spaces, hyphens)
export function isValidName(name) {
  if (!name || typeof name !== 'string') return false
  const cleanName = name.trim()
  if (cleanName.length < 2 || cleanName.length > 60) return false
  // Allows Arabic characters, Latin letters, spaces, and hyphens/apostrophes
  const namePattern = /^[\u0600-\u06FFa-zA-Z\s\-\.\'\’]+$/
  return namePattern.test(cleanName)
}

// Normalize Arabic text for smart search (handles hamza variations, taa marbuta, yaa/alif maqsura, and diacritics)
export function normalizeArabic(text) {
  if (!text || typeof text !== 'string') return ''
  return text
    // Remove Arabic diacritics (tashkeel)
    .replace(/[\u064B-\u065F\u0670]/g, '')
    // Normalize Alef variants
    .replace(/[إأآٱ]/g, 'ا')
    // Normalize Taa Marbuta
    .replace(/ة/g, 'ه')
    // Normalize Yaa / Alif Maqsura
    .replace(/ى/g, 'ي')
    // Normalize Arabic comma / punctuation
    .replace(/[،؛؟]/g, ' ')
    .toLowerCase()
    .trim()
}
