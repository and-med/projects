FROM golang:1.17-alpine

WORKDIR /app

COPY go.mod ./go.mod
COPY go.sum ./go.sum

RUN go mod download

COPY cmd ./cmd
COPY db ./db
COPY internal ./internal
COPY .env .env

RUN go build -o time-tracker-backend ./cmd/api/

ENTRYPOINT ["./time-tracker-backend"]