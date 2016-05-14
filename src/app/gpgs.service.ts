import { Injectable, NgZone } from '@angular/core';

declare var gapi;

@Injectable()
export class GpgsService {

  public connected;
  public user;
  public profile;

  private static levels: Array<string> = [
    'CgkIg-L2stUXEAIQIQ',
    'CgkIg-L2stUXEAIQIg',
    'CgkIg-L2stUXEAIQIw',
    'CgkIg-L2stUXEAIQJA',
    'CgkIg-L2stUXEAIQJQ',
    'CgkIg-L2stUXEAIQJg',
    'CgkIg-L2stUXEAIQJw',
    'CgkIg-L2stUXEAIQKA',
    'CgkIg-L2stUXEAIQKQ',
    'CgkIg-L2stUXEAIQKg'
  ];
  constructor(private zone: NgZone) { }

  public createSigninButton() {
    gapi.signin2.render(
      'google-login-button',
      {
        'onSuccess': (user) => {
          this.zone.run(() => {
            this.connected = true;
            this.user = user;
            this.profile = this.user.getBasicProfile();
          });
        },
        'scope': 'profile',
        'theme': 'dark',
        'onfailure': (err) => {
          console.log('error:' + err);
        }
      });
  }

  public signout() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(() => {
      this.zone.run(() => {
        this.connected = false;
        this.user = null;
        this.profile = null;
      });
    });
  }

  public sendLeaderboardLevel(level: number) {
    if (!this.connected) {
      return;
    }
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.submit(
        {
          leaderboardId: 'CgkIg-L2stUXEAIQHw',
          score: level
        }
      );
      request.execute(function (response) {
        console.log(response);
      });
    });
  }

  public sendLeaderboardChrono(level: number, secs: number) {
    if (level > 10) {
      return;
    }
    if (!this.connected) {
      return;
    }
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.submit(
        {
          leaderboardId: GpgsService.levels[level - 1],
          score: 1000 * secs
        }
      );
      request.execute(function (response) {
        console.log(response);
      });
    });
  }

  public getMyBestAtLevel(level: number, callback: (score) => void) {
    gapi.client.load('games', 'v1', (response1) => {
      var request = gapi.client.games.scores.get(
        {
          leaderboardId: GpgsService.levels[level - 1],
          playerId: this.user.getId(),
          timeSpan: 'ALL_TIME'
        }
      );
      request.execute(function (response) {
        console.log(response);
        callback(response);
      });
    });
  }
}
