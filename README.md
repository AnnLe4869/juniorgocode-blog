# Junior Go Code: how to write an article

## Article format

- First off, start with the name of the article in the `#` as top-level header
- Then, start with title, date and description of format

        ```
                ---
                Title: your title here
                Date: 12/21/2025
                Description: your description
                ---
        ```

  This part is important because our program extract data from this part

- Then start the content part. The content shall start with a header level `##`. The program detect the start of the content part by tracking the first `##` header

## Content directory format

The `content` directory's direct children are only subdirectories with name match the name of the article it has inside. Each subdirectory has the article in the markdown format. For example

```bash

content
|
|
|____what-is-the-role-of-react
|        |
|        |____index.md (the actual article)
|
|
|____how-to-use-react
|        |
|        |____index.md

```
