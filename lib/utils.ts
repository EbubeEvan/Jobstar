export const checkImageURL = (url : string) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};

export const convertToHyphens = (text: string) => {
    return text?.toLowerCase().replace(/\s/g, '-');
  }
