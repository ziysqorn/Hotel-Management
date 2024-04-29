// Trong file mới hoặc trong cùng file `ServicesPage.js`
import React from "react";
import { myAppColor } from "../../colors";
import "./style.css";

// Một component để hiển thị một dòng dữ liệu
export const DataRow = ({ code, name, price, icon1, icon2 }) => {
    return (
      <div className="Rectangle82" style={{ width: 1228, height: 76, background: '#111111', borderRadius: 5, marginBottom: 10 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 20px', color: 'white', fontSize: 16 }}>
          <div>{code}</div>
          <div>{name}</div>
          <div>{price}</div>
          <div>
            <span className={icon1} style={{ marginRight: 10 }}></span>
            <span className={icon2}></span>
          </div>
        </div>
      </div>
    );
  };
  
  // Trong component ServicesPage
  export const ServicesPage = ({ onSearch, ...props }) => {
    // Đây là phần code của bạn đã có
  
    return (
      <div style={{ /* Phần style của bạn */ }}>
        {/* Phần tìm kiếm và tiêu đề */}
  
        {/* Button thêm dịch vụ */}
        
        {/* Hiển thị dữ liệu */}
        <div style={{ padding: '20px' }}>
          <DataRow code="001" name="Service 1" price="$100" icon1="icon-class-1" icon2="icon-class-2" />
          <DataRow code="002" name="Service 2" price="$150" icon1="icon-class-3" icon2="icon-class-4" />
          {/* Thêm các hàng dữ liệu khác ở đây */}
        </div>
      </div>
    );
  };
  