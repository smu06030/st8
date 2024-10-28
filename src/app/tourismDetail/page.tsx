'use client';

import React, { useEffect, useState } from 'react';
import browserClient from '../../utils/supabase/client';

const TestSupabaseData = () => {
  useEffect(() => {
    const fetchDataFromSupabase = async () => {
      try {
        const { data, error } = await browserClient.from('tourlist').select('*');

        if (error) {
          console.error('Supabase 데이터 요청 실패:', error);
          return;
        }
        console.log('Fetched data from Supabase:', data);
      } catch (err) {
        console.error('API 요청 실패:', err);
      }
    };

    fetchDataFromSupabase();
  }, []);

  return <div>Check console for Supabase data</div>;
};

export default TestSupabaseData;
//서버