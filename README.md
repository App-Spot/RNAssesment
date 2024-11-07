# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.
# Prerequisites
Before running the app, ensure that you have the following installed on your development machine:

Node.js (v14.x or later)
npm or Yarn
React Native CLI: React Native CLI Setup
Android Studio or Xcode for building Android/iOS applications
## Step 1: Clone the Repository
First, clone the repository to your local machine:

bash
```
git clone https://github.com/App-Spot/RNAssesment.git
```
## Step 2: Install Dependencies
Make sure you have Node.js and npm installed. Then install the required dependencies:

bash
```
npm install
```
## Step 3: Install Native Modules (for iOS and Android)
If you are working with iOS, navigate to the ios folder and install the CocoaPods dependencies:
```
bash
cd ios
pod install
cd ..
```
## Step 4: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
# using npm
npm start
```

## Step 5: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# using npm
npm run android
```

### For iOS

```bash
# using npm
npm run ios
```

## Step 6: Refer screenshot for reference