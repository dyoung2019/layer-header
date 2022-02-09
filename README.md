# Layer header

Reverse engineering layer outline(?) controls of after effects 

## Approach 
Outline paging solution
2 level segment  
1. Top level Array-based segment tree (0-based) of the layer with total count of visible properties (as total height)
2. Secondary level of each property and their height

Since layers is various types with the same number of props 


With per-property state controlling 
- is-expanded
- separate-dimensions 


## TODOs 

1. The Rotation property field is used for 2D layers 
    1. On a 3D layer, Orientation and its children properties Rotation X (i.e. on X axis), Rotation Y (i.e. on Y axis) and Rotation Z (i.e. on Z axis) **are shown instead**
    1. THEREFORE There is a dependency of 3D layer
    1. => if (is3DLayer) ? show 4 properties else 1 property
1.  The position property can be split into 2 separate property for a 2D layer or 3 for a 3D layer by selecting separate dimensions 
    1. THEREFORE There is a dependency of 3D layer and a separate dimensions flag on layer
    1. => if (is3DLayer) ? show 4 properties else 1 property    
1.  The layer has expand all toggle which show all properties for that layer type
    1. THEREFORE a flag for expand all is required
1. Regional context for property names

## Ideas 

using a nested set to represent properties
https://en.wikipedia.org/wiki/Nested_set_model

## Usage

Those templates dependencies are maintained via [pnpm](https://pnpm.io) via `pnpm up -Lri`.

This is the reason you see a `pnpm-lock.yaml`. That being said, any package manager will work. This file can be safely be removed once you clone a template.

```bash
$ npm install # or pnpm install or yarn install
```

### Learn more on the [Solid Website](https://solidjs.com) and come chat with us on our [Discord](https://discord.com/invite/solidjs)

## Available Scripts

In the project directory, you can run:

### `npm dev` or `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>

### `npm run build`

Builds the app for production to the `dist` folder.<br>
It correctly bundles Solid in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

## Deployment

You can deploy the `dist` folder to any static host provider (netlify, surge, now, etc.)
