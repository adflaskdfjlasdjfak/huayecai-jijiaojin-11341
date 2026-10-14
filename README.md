# 花椰菜#11341 · 鸡脚筋礼物页

这是可直接放到 GitHub Pages 的单页网站。`IMG_2787.jpg` 与用户提供的原图逐字节相同。

## 发布

1. 将本目录中的文件上传到 GitHub 仓库根目录。
2. 在仓库的 **Settings → Pages** 中选择 **Deploy from a branch**、`main` 和 `/ (root)`。
3. 站点地址为 `https://<GitHub 用户名>.github.io/<仓库名>/`。

## 地址接收

GitHub Pages 只能托管静态页面，不能保管发信密钥或运行数据库。本版本通过 FormSubmit.co 的 AJAX 接口把地址发到站长邮箱。首次使用需要在收件箱中点 FormSubmit 的激活链接；激活后应使用邮件提供的匿名别名，在 `config.js` 设置 `window.GIFT_FORM_ENDPOINT = "https://formsubmit.co/ajax/<别名>"`。不要在仓库中放 Resend API Key、邮箱登录密码或其他服务端密钥。

重新填写会再次发出一封标题为“鸡脚筋收货地址更正”的邮件，邮件中保留同一提交编号，并注明以更正后的地址为准。

FormSubmit 官方说明：提交档案保留 30 天，可通过邮箱收到通知；此 GitHub Pages 版本没有单独的永久数据库后台。原 Sites 站点的旧记录仍在原后台，新链接收到的地址不会自动进入旧后台。

## 本地预览

在本目录运行 `python3 -m http.server 8765`，然后打开 `http://localhost:8765/`。

## 发布前检查

- 在手机上打开 GitHub Pages 链接。
- 空地址被拦截，提交中按钮不可重复点击。
- 用“测试记录，请勿寄送”提交一条测试地址，确认邮箱收到。
- 点击“重新填写”提交更正，确认第二封邮件带相同提交编号。
