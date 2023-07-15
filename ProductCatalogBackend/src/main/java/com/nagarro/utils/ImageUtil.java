package com.nagarro.utils;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Paths;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import com.nagarro.constant.Constant;
import com.nagarro.model.Product;

@Component
public class ImageUtil {

	/**
	 * Save image to particular folder
	 * 
	 * @param product
	 * @param file
	 * @return
	 */
	public boolean saveImage(Product product, MultipartFile file) {
		String uploadDirectory = Constant.UploadDirectory;

		String fileName = file.getOriginalFilename();
		String filePath = Paths.get(uploadDirectory, fileName).toString();
		if (fileName == null || fileName.contains("..")) {
			return false;
		}
		try {

			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(new File(filePath)));
			stream.write(file.getBytes());
			stream.close();
			byte[] imageData = file.getBytes();
			product.setImage(imageData);
		} catch (Exception e) {
			e.printStackTrace();

		}

		return true;
	}
}
