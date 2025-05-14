FROM quay.io/a-s-w-i-n-s-p-a-r-k-y/x-bot-md:latest

WORKDIR /DOTSERMODZ

ENV TZ=Asia/Kolkata

COPY package.json yarn.lock ./
RUN yarn install --network-concurrency 1

COPY . .

CMD ["node", "index.js"]
