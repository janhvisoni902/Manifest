import { assetUrl } from '../lib/router';

/**
 * Testimonial Data Model
 * Fill videoUrl with MP4 path, YouTube URL, or Vimeo URL to activate player.
 * Leave videoUrl empty to render accessible placeholder.
 *
 * @type {Array<{
 *   id: string,
 *   clientName?: string,
 *   clientRole?: string,
 *   company?: string,
 *   quote?: string,
 *   provider?: 'mp4' | 'youtube' | 'vimeo',
 *   videoUrl?: string,
 *   posterUrl?: string,
 *   captionsUrl?: string
 * }>}
 */
export const testimonialsData = [
  {
    id: 'testimonial-1',
    clientName: 'Client Testimonial',
    clientRole: 'Verified Client',
    company: 'Manifest Partner',
    quote: 'Manifest Marketing turned our growth engine into a predictable, scalable revenue machine.',
    provider: 'mp4',
    videoUrl: assetUrl('/videos/manifest-marketing-testimonial.mp4'),
    posterUrl: assetUrl('/section-images/testimonials.jpg'),
    captionsUrl: ''
  },
  {
    id: 'testimonial-2',
    clientName: '',
    clientRole: '',
    company: '',
    quote: '',
    provider: 'mp4',
    videoUrl: '',
    posterUrl: '',
    captionsUrl: ''
  },
  {
    id: 'testimonial-3',
    clientName: '',
    clientRole: '',
    company: '',
    quote: '',
    provider: 'mp4',
    videoUrl: '',
    posterUrl: '',
    captionsUrl: ''
  }
];
