import { createClient } from '@supabase/supabase-js'

// Test the Supabase function directly
const supabase = createClient(
  'https://ixhqkljpsqwycmxckkzx.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4aHFrbGpwc3F3eWNteGNra3p4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMzMjAzMzAsImV4cCI6MjA0ODg5NjMzMH0.Hu5TqnvjOrvCMtTBgHB7NrHnQZTJBYGqPOFVJo2nTNY'
)

async function testCredentials() {
  console.log('Testing Supabase function credentials...')
  
  try {
    const { data, error } = await supabase.functions.invoke('music-recognition', {
      body: { test: true }
    })
    
    if (error) {
      console.error('❌ Error:', error)
      return false
    }
    
    console.log('✅ Response:', data)
    return data?.success
  } catch (error) {
    console.error('❌ Exception:', error)
    return false
  }
}

async function testWithDummyAudio() {
  console.log('Testing with dummy audio...')
  
  // Create a small dummy audio file
  const dummyAudio = new Blob([new ArrayBuffer(1024)], { type: 'audio/webm' })
  const formData = new FormData()
  formData.append('audio', dummyAudio, 'test.webm')
  
  try {
    const { data, error } = await supabase.functions.invoke('music-recognition', {
      body: formData
    })
    
    if (error) {
      console.error('❌ Audio test error:', error)
    } else {
      console.log('✅ Audio test response:', data)
    }
  } catch (error) {
    console.error('❌ Audio test exception:', error)
  }
}

async function main() {
  console.log('=== ACRCloud API Test ===\n')
  
  const credentialsOk = await testCredentials()
  
  if (credentialsOk) {
    console.log('\n=== Testing Audio Processing ===')
    await testWithDummyAudio()
  } else {
    console.log('\n❌ Credentials test failed - check Supabase secrets')
  }
}

main().catch(console.error)
