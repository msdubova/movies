// controllers/MediaController.ts

import { Request, Response } from 'express';
import Media from '../models/Media';

class MediaController {
  // Fetch all media items
  async getAllMedia(req: Request, res: Response) {
    try {
      const media = await Media.findAll();
      res.json(media);
    } catch (error) {
      console.error('Error fetching media items:', error);
      res.status(500).json({ error: 'Error fetching media items' });
    }
  }

  // Fetch movies
  async getMovies(req: Request, res: Response) {
    try {
      const movies = await Media.findAll({
        where: { media_type: 'movie' },
      });
      res.json(movies);
    } catch (error) {
      console.error('Error fetching movies:', error);
      res.status(500).json({ error: 'Error fetching movies' });
    }
  }

  // Fetch TV shows
  async getTVShows(req: Request, res: Response) {
    try {
      const tvShows = await Media.findAll({
        where: { media_type: 'tv' },
      });
      res.json(tvShows);
    } catch (error) {
      console.error('Error fetching TV shows:', error);
      res.status(500).json({ error: 'Error fetching TV shows' });
    }
  }
}

export default new MediaController(); // Export an instance of the class
