<details>
  <summary>目錄</summary>
  <ol>
    <li><a href="#POS機系統">POS機系統</a></li>
    <li><a href="#專案功能">專案功能</a></li>
    <li><a href="#環境建置與需求">環境建置與需求</a></li>
    <li><a href="#安裝與執行步驟">安裝與執行步驟</a></li>
    <li><a href="#專案畫面">專案畫面</a></li>
  </ol>
</details>

&nbsp;
# **POS機系統**

Point of sale 銷售時點情報系統

&nbsp;
## **專案功能**

* 使用者可以方便的進行點餐服務：
    * 利用左側功能快速切換分類
    * 於左下角確認點餐狀況，或清除訂單
    * 餐點帶有icon可以知道素食、辣與不辣等屬性
    * 每份餐點都可撰寫客製化備註

* 使用者可以設定缺貨狀況：
    * 選擇缺貨原物料來停售相關的商品
    * 利用快速鍵進行一鍵補貨
    * 缺貨資料儲存於瀏覽器，不會影響其他機台之使用者

* 使用者可以修改產品資料:
    * 編輯、修改與新增詳細資料
    * 刪除產品時將在確認避免誤刪

* 使用者可以自訂客製化的主題顏色:
    * 依照喜好選擇顏色時有模擬畫面可預覽
    * 可根據不同裝潢風格進行設計，而不影響其他機台之使用者

&nbsp;
## **環境建置與需求**

* [Node.js](https://nodejs.org/en/) - v16.15.1
* [MongoDB](https://www.mongodb.com/zh-cn/cloud/atlas/efficiency) - Atlas

&nbsp;
## **安裝與執行步驟**


１.Clone 專案

```properties
git clone https://github.com/RNovice/POS_System
```

２.安裝node套件

```properties
npm install
```

３.若使用自己的MongoDB資料庫
> 設定環境變數 process.env.MONGODB_URI 為資料庫URI

> 或於models資料夾 mongoose.js 第3行 修改連線資料庫
```js
mongoose.connect('資料庫URI', { useNewUrlParser: true, useUnifiedTopology: true })
```
> 載入種子資料

利用終端機載入種子資料

```properties
npm run seed
```

４.執行專案
> node
```properties
npm run start
```

> nodemon(視需求)

```properties
npm run dev
```

５.在瀏覽器上瀏覽專案

```
http://localhost:3000
```

專案啟動成功時，終端機輸出
```
Listening on http://localhost:3000
```
資料庫連接成功時，終端機輸出
```
mongodb connected
```

&nbsp;
## **專案畫面**

點餐功能
![專案畫面](https://lh3.googleusercontent.com/m1u4zhELRylk8d72gCYALmtftUWmf_2C2cFnE5y0tbrUsx5E210FicDcy_fQEue8XeqMp-KzBYbOTJ0AAM_pM_Bw1rkodlw2iD2vxhvKop764vcCKLbkmbxomBPgE-EBNnZztz8Hzzsr86OuRmKnA904Z-251u0lYFOa3wQBIkrkHsn3bVq8YMMdQEZMDtU5bjGysiFWZkb8H5zpoUHPB8Vy2HKpsPsPVbEg6PYPd7QxQoxgSU0pN_-TEWUQ8bjykb2M9eW1bNsJKIbL8J6Mx_hTZ-3mTNzIc2OEncQHIVr7O9doUkjcIpbWEkXOXkip2OxABbQth-n1_jTUwXKgMP13sYnOMQxOExLv9Uhzuts4-ewHwNTWQBbsGWIeRJWDIMuHLIGsokQUAHhP1jyl1GLA9BLZNxPoGQyiYOyLVHNDNd6XPUAKFmIuTCYLcv6FPAG5Iv3c8gBboJbufz2G0DD69h65A3G5pqaqnLudz-f6Uy64sMd8v2rvDNf2J-yvpTNMYquNW8C8aMq9RbZVzyoJVTSJe9pA2SsiFvPLeHmjoXaMuiGoNrVC3SuqTNW8RhZqJWr3dopZSrTEsE02VjrZ81rr0om_TVmkM1NL1-4xVHe3s3F3LnwzPLUwIIpFqbVPQa16bL9iCHlIH2ESLjDowXyB3JLM2y6oKiOaaTF86FXd-lMrliQGpXW7HVu8MaB1ZqflVBtFBbCVG9OLmwnKf65PGCZLZPAWi0CnxLMITLYSzaPOLtFAsA3tKrokBkEZisRYZxbOv51DFdsiWPQ=w960-h540-no?authuser=1)

原物料缺貨功能
![專案畫面](https://lh3.googleusercontent.com/cnYWoJeuDBfL-8g13kCXEPRagdl7cmLxnAiuPlaReauycO9J1meGzHHF-xIum9Iymd6HW-DImBXabIGp7g33QsIv-AZrDbIKQwvSct_UhFoXiVmwuFqOV1F37bCuGgaN0NR52Bd9RhB57NXg_4nl75taY66rQB1lJftetTyAsEZkhh1USVzxXYmKNcN14OFjT0WRU1CLUId-JCYSapIIdeaf0tQauVttEsSUMq1P3zmURxJS2zwTDs83-TlSU58x9bvjYllsNsWTUUwn3l1Dh8J_TpyM6P9GfPRzSX-DDL_eRZC1nBsoEARYIY6YVguTAxEthHk4bYRKFpD5gRYgv7prurSaQjUBkUltlKfqW448cHrdLTSrjMKSQSwYvi07hRQpz7Th52toA6uFrb4ymyW-YUCQh9aWPj1gIWqKNsLZOvNOQ_OoSb_WrLkdfzII1bfF3lLBh4Ppt5vaOyYmxYUd_vlo70oUBi_S2MpJ0skg4q25z1JpPPfUz2uv58L_D09Fj-wePfjJ-fP3neiiKAz1gcG7BAqnT8BrqEXu7K6NSa-2oSu7JhFFrpDwAqCH5iI9LOhbAItT9Sw5sVTiJj8ITvukzOfeknEnrhS2K2wsWYTJ_nNgaFgdiNL27BEw76as-8rVWPfCWETDhwp0tQIrgJNx899hZ5B2QSb6wT0s5kJwTGe5oDeMqF_nUqca-bUER5U_NtWewynXC3lH2dhJdWHsCS-di8O1uiAVa-FG1SfKBDl-cDuOMsiAthThK7f0EQszAbK39GV7Lcl7eW0=w960-h540-no?authuser=1)

產品編輯功能
![專案畫面](https://lh3.googleusercontent.com/UoOLq_6ShWnXftu2SdDdMOkO0Hj6NwEp2yVEdPAKFn_C6vTJvJ2EChfhv5JE2Bj9OTdB_cYNmdPX2zWJK-Ht7iT04PRNI4Cq9LECMzfCN7o9giWUp6-JKmUAm5wogkrPbj8VwvOGc4_e2_KSsTlGTX1CJgC72MD3hc6JnAiUm1ms7ZxwLyOPocBaWqoQVVq37gT7X_6n3_Ivaf2zVga07d4BinXTlTy7MVRFLgft7oE1piTmiraGjgR7_cDKmDRN7lVnO6Ofre_fAs3jqtrKrG6hES-ohLVBQZslGjHYcCqeA8pUFy1Jm7t32QKbgsvBYBDmm8UA5DlIzMyicxNR7jF1ChzTXslrGw6Wny9EXt0jgP377q1SVFgwGWyWcc2aTcAPXB9e0A7KjaasgOuSUEIh-wPZOl_3eSA2Z-ispL6-vnYtwYx7mkbkjudqLWSxfWYFD9RURCjTeIKpCEdKq094116NJI6U0_uRR8q6XJ76j1vw5vhnZ70bHsZRXgIh74XIATilfWSKs_Dzw6h74yfSfpKQh-6wsU8jKygV6-eXNicnwuGqztlx_VZcKbQgIUZ6bcgxYqGHQio909_s8E4Orcu4NPs8TqdEivlbvI4p954AKDQ45ZraS_nFxiTtUnOM5s7FfAS5wJz_xGep7tu9WLpSAfiTWAvrfPDAcmt3Toudf8vuNtnffdnAxbKI-2XEzcIbI50jREGL-mBUdbPWkPFwV5uTHLiRtBJ6coqo5v4sHkAtg4yyPpXuUR_eiay_YjG3q5h0LdlnJo1HonsZ=w960-h540-no?authuser=1)

客製化主題顏色功能
![專案畫面](https://lh3.googleusercontent.com/EA_ck2ZEeqq2GTdU72_84xjJaRL7e5EtPqXi2oA1YNMAiJF91sIwI_oLRBoOleilwVxM9cF9BcnpdB6H61fDl98yxS8BIDGIBdOeXUQOzV_CKNN3hPl_W7R27TRlYdNvqGMrdNWpwQxHsJzPWh4Q622S8t1YKxogs3gDp_WpsOYL25zuKr11SLlWAc452QkQAy1VY4h8GlNOya8BvAiBGO7dG6vXF4c-XtoXUbB6fN3vNHmVNTLz2KEAJX2u-khKTEveU9VwhMARCcGPyohM3NEhpLHeP5xnAlrTtrwzt3U3RmvwqEXb4clSKWXgq5fxDbp53b4rxbTSGLuaHHWHORAkJiju56Zi21SSMoSSIyfNK7Os5UGq6KaOa178Zc6pYVeo67v3MT2EEV4PNT1QtKfHE4sRNA_oS5prKGv48-lxMZFUs8xxcafMcHSXolPQowRKHe-WgsMFExb8wflgPOqJCE0Jd4NHNb4zgxdUVYX7fJGwiTpS6LDga3KmAc6gA5iG6MJ-t3pMIBkM6jHaLW1YGXKIT44EwNrvamkQR1448TQNtXAPXGcp1PFiHbU49NGWiaT3c26W0LWv2UZrOWxMGQCsE2DFlPr1EN6xwiYA7hBqtIIBCdpbdD1PKm7EPSb8YpQhUHBTG-zo7i4xk-yTeIPu-GogGpVz28e9q-SKcvxeG68EVPLNb2SNypfk9jpgX1gN1-nPU1b3xQt8b6VF9G-XKlRyTLKQ_VcCCBCPfNNpfsyw0hmpbrekh2QioVhNoisrwLMilJRCIHTaulDG=w960-h540-no?authuser=1)
