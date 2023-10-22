# AIS Stream API

## Demo

- [https://code4fukui.github.io/aisstream/](https://code4fukui.github.io/aisstream/) at 2023-10-23

## Sample JSON Data

- [sample](sample)

## To Receive Data

1. Get your API_KEY from [aisstream.io](https://aisstream.io/) and write as the ".env" file.
```
AISSTREAM_API_KEY=xxxxxxxxx
```

2. Receive Data from aistream via [Deno](https://deno.land/).
```
deno run -A receiveData.js
```

3. Make latest CSV data files.

```
deno run -A make_latestPosition.js
deno run -A make_latestShipStatic.js
```

4. Check the map on your browser.
```
deno run -A https://taisukef.github.io/liveserver/liveserver.js 7777
```
open [http://[::]:7777/](http://[::]:7777/)
