A Code Sample for a Catalyst Circuits which will help you process images and separate SFW images .

You need to generate a API Key from https://pixabay.com/ to use in the code. You can replace it in the fetch_images_list_from_url function. 

Create the following in the Catalyst Console : 

1. Clone the above code and deploy the same using the command "catalyst deploy" to the Catalyst Console. You will be creating 4 functions in the process.

2. Create a circuit with the following JSON Structure.Replace the function IDs with the Basic IO function IDs deployed previously. (The following JSON must be pasted inside the Code view of your circuit.

{
	"GetImages4mUrl": {
		"type": "function",
		"next": "Check4NSFW",
		"start": true,
		"functionId": "fetch_images_list_from_url_function ID"
	},
	"Check4NSFW": {
		"type": "function",
		"next": "GenThumbNail4SFW",
		"functionId": "check_image_moderation_function ID"
	},
	"GenThumbNail4SFW": {
		"type": "function",
		"next": "End",
		"functionId": "image_resize_function ID"
	}
}

3. Create two folders with the names resizedImages and storeImages.

    Kindly replace the following constants in the code.

    -> Circuit ID : The ID of the above Created Circuit
    -> Folder ID : The IDs of the above Folders.

4. Once the constants are being replaced, again deploy your code to complete the application.
