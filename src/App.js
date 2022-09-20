
import './index.css'
import Header from "./components/Header/Header";
import Expired from "./pages/Expired/Expired";
import Supply from "./pages/Supply/Supply";
import Record from "./pages/Record/Record";
import AddSupply from "./pages/AddSupply/AddSupply";
import TakeSupply from "./pages/TakeSupply/TakeSupply";
import SupplyKind from "./pages/SupplyKind/SupplyKind";
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
// 畫面: 
// 1. 所有物資資料 
// 2. 三個月內過期物資資料 
// 3. 兩個按鈕 -> showModal -> 新增/領取物資
// 4. 兩個按鈕 -> showModal -> 新增人員/物資種類
// 5. 右邊人員列表 有x可刪除人員 (手機板 -> 右上icon -> drawer)
// 6. header -> 點到移到哪裡 (手機板 -> 左上icon -> drawer)

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Supply />} />
        <Route path='/expired' element={<Expired />} />
        <Route path='/record' element={<Record />} />
        <Route path='/addsupply' element={<AddSupply />} />
        <Route path='/takesupply' element={<TakeSupply />} />
        <Route path='/supplykind' element={<SupplyKind />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
