export const getChartData = (productData) => {
  const today = new Date();
  const last15Days = [];

  // หาวันที่ย้อนหลัง 15 วัน
  for (let i = 14; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(date.getDate() - i);

    // ฟิลเตอร์ข้อมูลตาม outbound_date, status "อนุมัติ" และ haveSN
    const dayDataTrue = productData.filter((product) => {
      const productOutboundDate = new Date(product.outbound_date);
      return (
        product.status === "อนุมัติ" && // ตรวจสอบ status "อนุมัติ"
        product.haveSN === true && // ตรวจสอบ haveSN เป็น true
        productOutboundDate.toDateString() === date.toDateString() // เปรียบเทียบวันเดียวกัน
      );
    });

    const dayDataFalse = productData.filter((product) => {
      const productOutboundDate = new Date(product.outbound_date);
      return (
        product.status === "อนุมัติ" && // ตรวจสอบ status "อนุมัติ"
        product.haveSN === false && // ตรวจสอบ haveSN เป็น false
        productOutboundDate.toDateString() === date.toDateString() // เปรียบเทียบวันเดียวกัน
      );
    });

    // สร้างข้อมูลให้แสดงใน chart
    last15Days.push({
      name: date.toLocaleDateString(),
      yTrue: dayDataTrue.length, // จำนวนสินค้าที่มี haveSN เป็น true
      yFalse: dayDataFalse.length, // จำนวนสินค้าที่มี haveSN เป็น false
    });
  }

  return last15Days;
};

export const chartOptionsHaveSN = (chartData) => ({
  chart: {
    type: "column",
    width: 600, // กำหนดความกว้างของกราฟ (สามารถปรับค่าได้ตามต้องการ)
    height: 375, // กำหนดความสูงของกราฟ (สามารถปรับค่าได้ตามต้องการ)
  },
  title: {
    text: "สินค้าที่อนุมัติใน 15 วันที่ผ่านมา",
  },
  xAxis: {
    categories: chartData.map((data) => data.name), // ใช้ชื่อวันที่ใน xAxis
    labels: {
      rotation: -45,
      style: {
        color: "blue",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
  },
  yAxis: {
    title: {
      text: "จำนวนสินค้า",
    },
  },
  legend: {
    enabled: false,
  },
  plotOptions: {
    column: {
      pointWidth: 22, // กำหนดความกว้างของแท่งกราฟ (ค่าเป็น pixel)
      borderWidth: 0, // เอาขอบออกจากแท่งกราฟ
    },
  },
  series: [
    {
      name: "สินค้าอนุมัติ",
      colorByPoint: true,
      data: chartData.map((data) => data.yTrue), // จำนวนสินค้าอนุมัติที่มี haveSN เป็น true
      dataLabels: {
        enabled: true, // เปิดให้แสดงคำอธิบายบนแท่งกราฟ
        style: {
          fontSize: '12px', // กำหนดขนาดฟอนต์ของคำอธิบาย
          fontWeight: 'bold', // ทำให้ตัวเลขตัวหนา
          color: '#000000', // กำหนดสีของคำอธิบาย (สีดำ)
        },
        formatter: function () {
          return this.y + ' รายการ'; // เพิ่มคำอธิบาย เช่น "42 รายการ"
        }    
      },
    },
  ],
});
export const chartOptionsNoSN = (chartData) => ({
  chart: {
    type: "column",
    width: 600, // กำหนดความกว้างของกราฟ (สามารถปรับค่าได้ตามต้องการ)
    height: 375, // กำหนดความสูงของกราฟ (สามารถปรับค่าได้ตามต้องการ)
  },
  title: {
    text: "สินค้าที่อนุมัติใน 15 วันที่ผ่านมา",
  },
  xAxis: {
    type: "category",
    categories: chartData.map((data) => data.name), // ใช้ชื่อวันที่ใน xAxis
    labels: {
      rotation: -45,
      style: {
        color: "blue",
        fontSize: "12px",
        fontWeight: "bold",
      },
    },
  },
  yAxis: {
    title: {
      text: "จำนวนสินค้า",
    },
  },
  legend: {
    enabled: false, // ปิดคำอธิบายใต้กราฟ
  },

  plotOptions: {
    column: {
      pointWidth: 22, // กำหนดความกว้างของแท่งกราฟ (ค่าเป็น pixel)
      borderWidth: 0, // เอาขอบออกจากแท่งกราฟ
    },
  },

  series: [
    {
      name: "สินค้าอนุมัติ",
      colorByPoint: true,
      data: chartData.map((data) => data.yFalse), // จำนวนสินค้าอนุมัติที่มี haveSN เป็น true
      dataLabels: {
        enabled: true, // เปิดให้แสดงคำอธิบายบนแท่งกราฟ
        style: {
          fontSize: '12px', // กำหนดขนาดฟอนต์ของคำอธิบาย
          fontWeight: 'bold', // ทำให้ตัวเลขตัวหนา
          color: '#000000', // กำหนดสีของคำอธิบาย (สีดำ)
        },
        formatter: function () {
          return this.y + ' รายการ'; // เพิ่มคำอธิบาย เช่น "42 รายการ"
        }    
      },
    },
  ],
});
