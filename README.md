
# File Uploader

Your friendly File Uploader component where you can upload files with different kinds of configurations. In this project you can check out all uploaded files and preview, edit, or remove them. You can test the component by trying different scenarios and adjusting props as u wish.




## Installation

Install dependencies:

```bash
  npm install

```

run the project:

```bash
  npm run dev

```

and you are all set! 
    
## Technical Desicions

~ I believe having consistent design system and branding is a cool thing. This is why I chose Techzy's landing page as inspiration. For UI library Im using Ant Design since I didn't had an experience working with it. Thought to use this as an opportunity. 

~ Decided to use react-dropzone as a file uploader since its highly customizable and flexible 

~ I'm rendering file previews as a List view since file uploader component can be different sizes and its easier to handle responsiveness this way

~ To view previusly uploaded files, added mock data in the project which is handled with zustand. currently, file uploader doesn't support api calls. 
## Important Notes

~ It's been surprisingly difficult to make UI/UX decisions. Since Im used to working with designers, choosing which way to take independently was a real challenhge. To orginize the chaos, I ended up creating doc file which you can check out here:

 https://docs.google.com/document/d/1OKKy1JTAQOgJR1X0-6dpON1z5OhzaDu_OjbB1Qsexxs/edit?usp=sharing

Writing out the ideas was indeed helpfull, but I still chose the design after trying different approaches in practice. This obviusly took me more time, But I think it turned out good enough. 


~ These are some improvements I would add if I had more time:   
tests with React Testing Library  
Error handling inside the component instead of using toastify.  
Previews for document type files  
API support and etc.. 


