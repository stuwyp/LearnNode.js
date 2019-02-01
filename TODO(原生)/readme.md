## Todo service
---
1. 获取单个todo

   url：`/todo/:id`   ( demo:  `/todo/1` )

   method:`get`

   result:

   ```
   {
       "data": [
           {
               "id": 7,
               "content": "play",
               "deadline": "2018-10-10T02:10:10.000Z"
           }
       ]
   }
   ```

   

2. 获取所有todo

   url：`/todo/`   ( demo:  `/todo/1` )

   result:`get`

   ```
   {
       "data": [
           {
               "id": 5,
               "content": "play",
               "deadline": "2018-10-10T02:10:10.000Z"
           },
           {
               "id": 6,
               "content": "play",
               "deadline": "2018-10-10T02:10:10.000Z"
           },
           {
               "id": 7,
               "content": "play",
               "deadline": "2018-10-10T02:10:10.000Z"
           }
       ]
   }
   ```

   

3. 增加todo

   url : `/todo`

   method:`post`

   body data:

   | 参数名   | 必选 | 类型     |
   | -------- | ---- | -------- |
   | content  | 是   | string   |
   | deadline | 是   | datetime |

   result：

   ```
   {
       "id": 11,
       "status": "Created"
   }
   ```

   

4. 删除todo

   url : `/todo/:id`

   method:`delete`

   result：

   ```
   {
       "status": "deleted"
   }
   ```

   

5. 更新todo

   url : `/todo/:id`

   method:`put`

   body data:

   | 参数名   | 必选 | 类型     |
   | -------- | ---- | -------- |
   | content  | 是   | string   |
   | deadline | 是   | datetime |

   result：

   ```
   {
       "status": "Updated"
   }
   ```

   
