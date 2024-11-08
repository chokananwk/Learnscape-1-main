// app/page.js
"use client";  // ระบุให้เป็น Client Component

import { useState } from 'react';
import FetchData from '../components/FetchData'; // นำเข้า FetchData component ที่ดึงข้อมูลจาก API

export default function HomePage() {
  const [apiData, setApiData] = useState(null);  // สร้าง state เพื่อเก็บข้อมูลที่ดึงมาจาก FetchData

  // ฟังก์ชันที่จะรับข้อมูลที่ดึงมา
  const handleDataFetched = (data) => {
    setApiData(data);  // บันทึกข้อมูลที่ดึงได้ใน state
  };

  return (
    <div>
      <h1 style={{ padding: '10px'}}>หน้าแสดงข้อมูลหลัก</h1>

      {/* ใช้งาน FetchData เพื่อดึงข้อมูล และส่งผลลัพธ์ผ่าน onDataFetched */}
      <FetchData onDataFetched={handleDataFetched} />

      {/* แสดงข้อมูลที่ถูกเลือก */}
      {apiData && apiData.features && (
        <div style={{ padding: '10px 35px'}}>
          {apiData.features.map((feature, index) => (
            <div key={index}>
              <p><strong>ชื่อสถานที่ (Name_TH):</strong> {feature.properties.name_th}</p>  {/* แสดงค่า name_th */}
              <p><strong>ชื่อสถานที่ (name_en):</strong> {feature.properties.name_en}</p>  {/* แสดงค่า name_th */}
              <p><strong>ละติจูด (Latitude):</strong> {feature.properties.latitude}</p>  {/* แสดงค่า latitude */}
              <p><strong>ลองติจูด (longitude):</strong> {feature.properties.longitude}</p>  {/* แสดงค่า longitude */}
              <p><strong>ที่อยุ่ ประเทศไทย (address_th):</strong> {feature.properties.address_th}</p>  {/* แสดงค่า address_th */}
              <p><strong>ที่อยุ่ ประเทศนอก (address_en):</strong> {feature.properties.address_en}</p>  {/* แสดงค่า address_en */}
              <p><strong>ที่อยุ่ ประเทศนอก (poi_type_t):</strong> {feature.properties.poi_type_t}</p>  {/* แสดงค่า poi_type_t */}
              <p><strong>ที่อยุ่ ประเทศนอก (poi_type_e):</strong> {feature.properties.poi_type_e}</p>  {/* แสดงค่า poi_type_e */}
              <br>
              </br>
              <p>-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
