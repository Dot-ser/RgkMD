FROM quay.io/a-s-w-i-n-s-p-a-r-k-y/x-bot-md:latest
RUN git clone https://github.com/Dot-ser/RgkMD /home/DOTSERMODZ
WORKDIR /home/DOTSERMODZ
ENV TZ=Asia/Kolkata
RUN yarn install --network-concurrency 1
CMD ["node", "index.js"]
