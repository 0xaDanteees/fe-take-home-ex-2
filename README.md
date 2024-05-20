# Frontend Take Home Task 2

Take Home Exercise 2 for Frontend React Role.

## Task 

Your task is to write a React application that can display the live data from the given WebSocket server.

You can create the React application in the root directory. You may choose the React framework of choice,
i.e., NextJS, CRA, Vite, etc.

You are required to write the application in TypeScript.

The WebSocket server is given to you, which provides you live data of random fake currencies with their value.
You will need to use these given live data to create a graphical representation of the currencies' values
across time.

It is entirely up to your own imagination for graphical representation the data, there's no hard rules on how
the data should be display, i.e., type of charts, number of charts, etc.

You do not need to make the site responsive, you can assume the resolution for viewing will be in 1920x1080.

You are specifically assessed on the following skills, use the following the guide what you might need to do:

- React
- TypeScript
- Styling Charts (You can use library, but do check the [Challenge](#challenge) section)
- Working with WebSocket data
- State / Memory Management
- Data Structures

The data from the WebSocket endpoint will be in the form of a JSON string. A sample, formatted response from the WebSocket is as such:

```json
{
  "name": "Nani",
  "value": "123456789012345678",
  "decimal": 8,
  "interval_in_ms": 1000
}
```

The fields of the response are as the following:

- The `name` string field represents the name of the currency.
- The `value` string field represents the value of the currency at the point in time.
- The `decimal` number field represents the number of decimal places in the `value` field. In the given example, this would
  mean that the `Nani` currency has the value of `1234567890.12345678`.
- The `interval` number field represents the interval where WebSocket would send the updated value of the currency. In the
  given example, this would mean that the WebSocket server provides the currency value of `Nani` every second.

You're encouraged to make use of comments to indicate thought process and explanations for your implementations.

## Setup

1. Fork the repository on GitHub in a public repository. ->done

2. Clone the forked repository. ->done

3. Build and run the server with the following code: ->done and you can actually initialize whole server + client with "npm run start"

```sh
# You will need to have Docker installed.
npm run build:server
npm run run:server

#Added this to initialize whole project
npm run start
```

4. Attempt the challenge.

5. (Optional bonus) Deploy the working project on a cloud platform. 
6. Send the repository link to us once you're done. 

## Challenge

You are free to attempt the take-home in any of the following difficulties you would prefer:

1. [Easy] Implement with existing packages.
2. [Medium] Implement without using a package, but with references. Quote the references on your
   implementations in your comments (i.e., Open Source repos / Stack Overflow links).
3. [Hard] Implement without using any package & reference.

#I prolly went medium(?) idk, was annoying not to be able to use shadcn so I didnt maxxed on frontend looks; letting you guys judge tho. Not bad for a first time go + vite project me thinks :D

The judgement of your skill level will be different based on whichever difficulty you've chosen.

Please let us know the difficulty you've chosen and attempted.

## F.A.Q.

<details>
    <summary>Why does the repository says exercise 2? Is there more?</summary>

    No, this is just one take-home exercise out of the collection we have. You're just
    a lucky fella to get the second one.

</details>

<details>
    <summary>This take home is too difficult, can I ask for another one?</summary>

    No, the other task are all similar in difficulty, with 3 difficulty levels. So there
    won't be much difference even if I give u other tasks.

</details>

<details>
    <summary>Why this task?</summary>

    The task is designed to test the handling of live large volume WebSocket data in React.

</details>

<details>
    <summary>I have more questions</summary>

    Feel free to reach out to ask more questions to whoever you are contacting with.

    Asking questions / guidance / hints do not penalize anything. Unless the questions
    may give too much answers, then we'll let you know before we answer.

</details>
