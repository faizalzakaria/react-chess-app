npm run dist
aws s3 sync dist s3://chess.codegarage.co --profile codegarage
