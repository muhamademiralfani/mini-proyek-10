import '@testing-library/jest-dom'; // Import tambahan untuk jest-dom
import { TextEncoder, TextDecoder } from 'util'; // Import util untuk TextEncoder dan TextDecoder

// Periksa keberadaan global.TextEncoder dan global.TextDecoder untuk mencegah overwrite yang tidak perlu
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as unknown as typeof global.TextDecoder;
}
